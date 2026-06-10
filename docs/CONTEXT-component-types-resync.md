# Re-syncing Component Types after an @ark-ui/vue change

Reusable AI-agent context for **updating the hand-written `types.ts` files under
`packages/registry/src/components/ui/`** when `@ark-ui/vue` (or its `@zag-js/*`
dependencies) is upgraded or its type definitions change.

This is the **maintenance companion** to
[`CONTEXT-component-types-definition.md`](./CONTEXT-component-types-definition.md).
That doc explains the *original* decoupling (how each component became
self-contained for types). **This doc explains how to keep those hand-written
types faithful when the upstream Ark types move.** Read the definition doc first
if you are not already familiar with the rules — everything here assumes them.

> **Why this exists.** The registry ships raw component source. To avoid dragging
> Ark's deep `@zag-js` machine/service generics into every consumer project
> ("Type instantiation is excessively deep", slow `vue-tsc`), every component's
> prop/emit/detail/context types are **hand-written 1:1 copies** of Ark's surface,
> stamped with the Ark version they were copied from. They are *manually* re-synced
> on upgrade — there is no codegen and no type-equivalence test. This doc is the
> re-sync procedure.

---

## When to use this

Trigger any of:

- `@ark-ui/vue` is bumped in `packages/registry/package.json` (or a lockfile
  change pulls a new resolved version / new `@zag-js/*` transitive versions).
- A `types.ts` provenance stamp no longer matches the resolved Ark version.
- A consumer reports a prop/emit that exists in Ark but is missing/wrong locally.
- `vue-tsc` shows a NEW error at a `.vue` binding to a runtime Ark component
  (a sign Ark changed a prop/type shape the local copy no longer matches).

If you are creating types for a **brand-new** component (not updating an existing
one), use `CONTEXT-component-types-definition.md` instead.

---

## The invariant you are maintaining

For every component under `packages/registry/src/components/ui/<name>/`:

1. **Zero Ark/zag TYPE imports.** No `.vue`, `types.ts`, or `context.ts` imports a
   *type* from `@ark-ui/vue` or `@zag-js/*`. Runtime **value** imports stay
   (`import { Menu } from '@ark-ui/vue/menu'`, `ark`, `mergeProps`,
   `createListCollection`, `useXxxContext()` value calls, `createContext`).
2. **Faithful 1:1.** Each local interface reproduces Ark's prop/emit/detail/context
   surface verbatim — every prop, exact type, full JSDoc + `@default`. No curating.
3. **Provenance stamped.** Each hand-written `types.ts` starts with the version it
   was copied from (see [Provenance](#step-4--update-provenance-stamps)).
4. **Local conventions.** `class?: HTMLAttributes['class']`, CVA `variant`, and the
   `align/side/sideOffset/alignOffset` positioning-abstraction props live in the
   **`.vue` local `interface Props extends XxxRootProps`** — NOT in `types.ts`.
   `types.ts` carries only the Ark-derived surface (`asChild`, real props/emits,
   detail types, context types).
5. **Shared primitives stay byte-identical.** See
   [Step 3](#step-3--keep-shared-primitive-copies-identical).

A re-sync is correct only when all five still hold AND the gates in
[Step 5](#step-5--verify-the-gates) pass.

---

## Quick start (the re-sync loop)

```bash
cd packages/registry

# 1. Resolve the new Ark version + the .d.ts source dir
node -p "require('@ark-ui/vue/package.json').version"          # e.g. 5.38.0
ARK=node_modules/@ark-ui/vue/dist/components                    # via the symlink (NOT .bun)

# 2. For each component, diff the Ark .d.ts you copied from against the local copy,
#    apply prop/emit/detail changes, re-stamp provenance.  (per-component, below)

# 3. Verify (THE gates — see Step 5)
bunx vue-tsc --noEmit            # real typecheck (NOT `bun run typecheck`)
bun run registry:build           # re-embed Ark-free source into public/r/*.json
bun run format src/components/ui/<name> [...]
python3 /path/to/scan_ark_types.py   # robust grep — see Step 5
```

---

## Step 1 — Detect the version delta

```bash
cd packages/registry
# resolved (installed) version:
node -p "require('@ark-ui/vue/package.json').version"
# versions the local types claim:
grep -rho "@ark-ui/vue@[0-9][0-9.]*" src/components/ui/*/types.ts | sort | uniq -c
```

The `.d.ts` source lives at
`packages/registry/node_modules/@ark-ui/vue/dist/components/<subpath>/`.
**Important:** resolve it via the `node_modules/@ark-ui/vue` symlink. Do **not**
`find node_modules/.bun ...` from inside `packages/registry` — `.bun` lives at the
**repo root**, so that find returns nothing.

`@zag-js/*` detail/collection types live at
`packages/registry/node_modules/@zag-js/<name>/dist/` (also symlinks). The exact
resolved zag versions are visible at the repo root under
`node_modules/.bun/@zag-js+<name>@<ver>+.../`.

To see exactly what changed upstream, keep the old Ark `.d.ts` around (e.g.
`git show <old-rev>:...` of node_modules is not possible; instead diff against the
version recorded in the provenance stamp by reading that version under
`node_modules/.bun/@ark-ui+vue@<old>/...` if still present, or read the upstream
changelog). In practice: **re-read the current Ark `.d.ts` and reconcile each local
interface field-by-field** — this is reliable regardless of whether the old `.d.ts`
is still on disk.

---

## Step 2 — Re-sync each affected component

Per component:

1. **Find the Ark `.d.ts`.** Mind the dir→subpath mapping (not always 1:1):

   | Component dir | Ark subpath |
   |---|---|
   | `calendar`, `range-calendar` | `date-picker` |
   | `command` | `listbox` (+ `dialog` for `CommandDialog`) |
   | `drawer`, `sheet` | `dialog` |
   | `context-menu`, `dropdown-menu`, `menubar` | `menu` |
   | `resizable` | `splitter` |
   | everything else | same name as the dir |

   `<subpath>/<subpath>.types.d.ts` holds `RootProps`/`RootEmits` (Vue-shaped, with
   `modelValue` + a `RootEmits` tuple shape — use these, NOT the raw `@zag-js`
   props). Per-part `*.vue.d.ts` files hold sub-part prop shapes.
   `<subpath>/index.d.ts` enumerates every exported interface (use it to confirm
   you have not missed a new part).

2. **Reconcile `RootProps` / `RootEmits`.** For every prop in Ark's `RootProps`,
   confirm the local `XxxRootProps` has it with the same type and JSDoc/`@default`.
   Add new props, fix changed types, drop removed ones. Same for `RootEmits`
   (including `update:modelValue` / `update:open` / etc.).

3. **Reconcile inlined detail types.** Each `ValueChangeDetails`,
   `OpenChangeDetails`, `HighlightChangeDetails`, `IntlTranslations`, outside-events,
   etc. is a verbatim copy of a `@zag-js/<name>` interface. Re-read the zag source
   (`cat node_modules/@zag-js/<name>/dist/index.d.ts`) and update the local copy.
   - **Outside-events** (`FocusOutsideEvent`/`InteractOutsideEvent`/
     `PointerDownOutsideEvent`) come from `@zag-js/dismissable` (dialog/menu/popover/
     hover-card/tooltip/select/combobox) or `@zag-js/interact-outside` (editable/
     tags-input). They are `CustomEvent<EventDetails<...>>`; copy the exact
     `EventDetails<T>` shape (see `tooltip/types.ts` / `editable/types.ts`).
   - **`PositioningOptions`** comes from `@zag-js/popper`, which re-exports leaf
     types from `@floating-ui/dom` / `@floating-ui/utils`. See
     [Landmine: positioning](#a-positioningoptions--floating-ui-leaf-types).
   - **`CollectionItem` / `ListCollection`** (select/combobox/command) come from
     `@zag-js/collection`. See [Landmine: ListCollection](#c-listcollection-class-vs-interface).
   - **`DateValue`** (calendar/range-calendar) stays imported from
     `@internationalized/date`. See [Landmine: DateValue](#b-datevalue-brand-clash).

4. **Reconcile sub-part props.** Most are `{ asChild?: boolean }`; some carry a
   required part prop (`AccordionItem.value`, `TabsTrigger.value`,
   `PinInputInput.index`, `StepsItem.index`, `DialogTrigger.value?`). Keep required
   props REQUIRED. Name each local interface EXACTLY as the `.vue` imports it.

5. **Reconcile context types** if `context.ts` uses a `Use*Context` /
   `Use*Return` / `*Api` interface (file-upload, select, tooltip provider,
   radio-group provider, menu provider). These are the heaviest — copy only the
   **public** members the component tree actually consumes (getters return `any` is
   acceptable to stay assignable; see the [select](#c-listcollection-class-vs-interface)
   and file-upload examples).

6. **Re-point nothing new** — the `.vue`/`context.ts` already import from `./types`.
   Only the contents of `types.ts` (and occasionally a `.vue` local `Props` for a
   genuinely new/changed prop) change on a re-sync.

7. **Re-stamp provenance** (Step 4) and run the gates (Step 5).

---

## Step 3 — Keep shared-primitive copies identical

Several components wrap the **same** Ark primitive but have **no
`registryDependencies` edge**, so each owns an **identical copy** of the shared
type set. When you change one, copy it VERBATIM to its siblings and verify with
`diff`:

| Ark primitive | Canonical (edit here first) | Copy verbatim into |
|---|---|---|
| `menu` | `dropdown-menu/types.ts` | `context-menu/types.ts`, `menubar/types.ts` |
| `dialog` | `dialog/types.ts` | `drawer/types.ts`, `sheet/types.ts`*, `command/types.ts`* |
| `date-picker` | `calendar/types.ts` | `range-calendar/types.ts` |

```bash
diff dropdown-menu/types.ts context-menu/types.ts   # MUST be empty
diff dropdown-menu/types.ts menubar/types.ts         # MUST be empty
diff calendar/types.ts range-calendar/types.ts       # MUST be empty
```

\* `sheet` appends a local `SheetContentProps`; `command` holds the `listbox` set
**plus** its own copy of the `dialog` set (for `CommandDialog`). For those, the
shared block must match the canonical and only the documented extra differs.

The **only** sanctioned cross-component type import is along an existing
`registryDependencies` edge — precedent: `date-picker/types.ts` re-exports
`LayoutTypes` from `../calendar/types`. **`calendar` must keep exporting
`LayoutTypes`** or `date-picker` breaks. Do not invent new cross-imports.

---

## Step 4 — Update provenance stamps

Stamp the top of every hand-written Ark-derived `types.ts` with the **resolved**
Ark version:

```ts
// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/<name>@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.
```

- Bump the version in every file you touch. Precedent: `file-upload/types.ts` was
  found stamped `5.36.2` and bumped to the resolved `5.37.0`.
- Pure-polymorphic Wave-1 files use the shorter phrasing
  ``// `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.`` — also valid;
  bump the version the same way.
- Components whose `types.ts` is **not** Ark-derived (sonner→`vue-sonner`,
  carousel→`embla`, data-table→`@tanstack/vue-table`, sidebar/date-picker custom
  wrappers, plain HTML wrappers) carry **no** Ark stamp — leave them.
- Sanity-check no stale versions survive:
  `grep -rho "@ark-ui/vue@[0-9.]*" src/components/ui/*/types.ts | sort -u` →
  should be a single version.

---

## Step 5 — Verify (the gates)

Run all of these. A re-sync is done only when they pass.

### 1. Robust grep — zero Ark/zag TYPE imports

**Do NOT trust a plain `grep "import type.*@ark-ui/vue"`.** It has BOTH failure
modes here:
- **False negatives:** misses multi-line imports
  (`import type {\n  Foo,\n  Bar\n} from '@ark-ui/vue/menu'`).
- **False positives:** the codebase (antfu) omits semicolons, so `.*` bridges a
  local `import type { X } from './types'` across newlines into a later runtime
  `import { ark } from '@ark-ui/vue'`.

Use this brace-scoped, multi-line-aware scanner (save as `scan_ark_types.py`, run
from `packages/registry`):

```python
import re, pathlib
ui = pathlib.Path("src/components/ui")
MOD = r"(@ark-ui/vue[^'\"]*|@zag-js[^'\"]*)"
pats = [
    re.compile(r"import\s+type\s*\{[^{}]*\}\s*from\s*['\"]" + MOD + r"['\"]"),        # import type { ... } from 'mod'
    re.compile(r"import\s+type\s+[A-Za-z_$][\w$]*\s+from\s*['\"]" + MOD + r"['\"]"),  # import type Foo from 'mod'
    re.compile(r"import\s+type\s*\*\s*as\s+[A-Za-z_$][\w$]*\s+from\s*['\"]" + MOD + r"['\"]"),
    re.compile(r"import\s*\{[^{}]*\btype\s+[A-Za-z_$][^{}]*\}\s*from\s*['\"]" + MOD + r"['\"]"),  # import { type Foo }
]
hits = {}
for f in sorted(ui.rglob("*")):
    if f.suffix not in (".ts", ".vue") or not f.is_file():
        continue
    txt = f.read_text(encoding="utf-8", errors="replace")
    found = sorted({m.group(1) for p in pats for m in p.finditer(txt)})
    if found:
        hits.setdefault(f.relative_to(ui).parts[0], []).append((str(f.relative_to(ui)), found))
print(">>> CLEAN <<<" if not hits else "\n".join(
    f"[{c}]\n" + "\n".join(f"    {p} -> {m}" for p, m in v) for c, v in sorted(hits.items())))
```

The `[^{}]*` (brace-scoped) is what prevents a type-import from bridging into a
different statement. Expect `>>> CLEAN <<<`.

### 2. `vue-tsc` — real typecheck (NOT `bun run typecheck`)

```bash
bunx vue-tsc --noEmit 2>&1 | grep "error TS"
```

`bun run typecheck` is plain `tsc --noEmit`, which **cannot resolve `.vue` imports**
and emits ~800 `TS2307 "Cannot find module './X.vue'"` noise errors — ignore it for
this work. `vue-tsc` is the real signal.

**Accepted baseline (NOT regressions — do not "fix" these):**

| Count | Where | Why accepted |
|---|---|---|
| 5 | `calendar` (2) + `range-calendar` (3) — DateValue / `VisibleRange` `TS2322` | [DateValue brand clash](#b-datevalue-brand-clash) |
| 4 | `navigation-menu`, `steps`×2, `file-upload` — `TS2345` | [useForwardProps forwarding](#d-useforwardprops-required-prop-forwarding) |

If `vue-tsc` shows MORE than these 9, the extra errors are real and caused by your
re-sync — fix them (usually a runtime-binding assignability problem; see
[Landmines](#landmines--runtime-binding-assignability)). If a future Ark version
*resolves* one of the accepted errors (e.g. the DateValue duplication goes away),
update this baseline.

### 3. `registry:build` — re-embed Ark-free source

```bash
bun run registry:build      # exit 0; re-embeds the new source into public/r/*.json
```

Spot-check a built JSON has no real Ark type imports (the build embeds each file as
one escaped line, so use a brace-scoped pattern, not `.*`):

```bash
grep -oE "import type \{[^{}]*\} from '@(ark-ui/vue|zag-js)" public/r/<name>.json   # expect: empty
```

### 4. `format`

```bash
bun run format src/components/ui/<name> [...]   # antfu: import order, single quotes, 2-space indent
```

Re-run `registry:build` after formatting if it changed any source (so the embedded
JSON matches). Re-`diff` shared-primitive copies after formatting — identical input
formats identically, so they should stay byte-identical.

### 5. Storybook smoke (manual)

Render each touched component's story; confirm no console errors. Critical for the
generic/collection (select/combobox/command) and context-heavy components.

---

## Conventions to preserve

| Do | Don't |
|---|---|
| Keep `class`/`variant`/`align`/`side` in the `.vue` local `interface Props extends XxxRootProps` | Move them into `types.ts` |
| Inline `PolymorphicProps` as `asChild?: boolean` with the standard JSDoc | Re-import `PolymorphicProps` |
| Keep runtime value imports (Ark component, `ark`, `mergeProps`, `createListCollection`, `useXxxContext()`) | Remove them — Ark is still the runtime engine |
| Keep `@internationalized/date`, `class-variance-authority`, `vue-sonner`, `@tanstack/vue-table`, `embla-carousel-vue`, `vue` types | Inline those — scope is strictly `@ark-ui/vue` + its `@zag-js` types |
| Name local interfaces EXACTLY as the `.vue` imports them | Rename (breaks the one-line import) |
| Re-anchor a local `Placement` alias to the concrete inlined union | Derive `Placement` from `XxxRootProps['positioning']['placement']` — that is **circular** and errors (`TS2456`) |

Vue compiler limit: a `<script setup>` `defineProps` generic interface cannot
`extends` an imported props type in some 3.3+ cases — write group props inline where
this bites (precedent: `checkbox` `CheckboxGroup`).

---

## Landmines — runtime-binding assignability

The #1 re-sync failure mode: a hand-written type that no longer matches the type the
`.vue` binds to on the **runtime Ark component** (`<Select.Root v-bind=...>`,
`<DatePicker.Root :positioning>`, context provider value). The local copy must stay
*structurally assignable* to Ark's runtime prop type. The four known traps:

### A. PositioningOptions / Floating-UI leaf types

`PositioningOptions` (popover, hover-card, tooltip, dropdown-menu, select, combobox)
is `@zag-js/popper`'s, which re-exports `Placement`/`Boundary`/`VirtualElement` from
`@floating-ui/dom` + `@floating-ui/utils`. The faithful inlined leaf types (copy
verbatim from `popover/types.ts`, which is correct):

```ts
export type Side = 'top' | 'right' | 'bottom' | 'left'
export type Alignment = 'start' | 'end'                 // NO 'center' — that breaks assignability
export type Placement = Side | `${Side}-${Alignment}`   // the 12-value Floating-UI union
export interface Rect { x: number, y: number, width: number, height: number }
export interface SideObject { top: number, right: number, bottom: number, left: number }
export type ClientRectObject = Rect & SideObject
export interface VirtualElement {
  getBoundingClientRect: () => ClientRectObject
  getClientRects?: () => Array<ClientRectObject> | DOMRectList
  contextElement?: Element
}
export type Boundary = 'clippingAncestors' | Element | Element[] | Rect
```
In `PositioningOptions`: `boundary?: (() => Boundary) | Boundary | 'clipping-ancestors'`,
`getAnchorElement?: (() => HTMLElement | VirtualElement | null)`,
`getAnchorRect?: ((el: HTMLElement | VirtualElement | null) => AnchorRect | null)`,
and `onComplete?: ((data: any) => void)` (leaving `ComputePositionReturn` as `any` is
fine — contravariant param). If Ark bumps `@floating-ui/*`, re-check these leaf
shapes against the new `@floating-ui/utils` `dist`.

### B. DateValue brand clash (calendar / range-calendar)

Ark's date-picker types `DateValue` as `@zag-js/date-utils`'s
(`CalendarDate | CalendarDateTime | ZonedDateTime`). The repo inlines `DateValue`
from `@internationalized/date` (a kept external type). Because the tree contains
**multiple `@internationalized/date` versions** (and `@zag-js/date-utils` bundles
its own), the two `DateValue`s are nominally incompatible (`#private` brand), which
produces the accepted `TS2322` at `CalendarCell`/`CalendarRoot` bindings. This is
the **same accepted class** the `date-picker` exemplar carries. Do NOT "fix" it with
`@zag-js` types or `any`. On upgrade, if the `@internationalized/date` duplication is
deduped, these errors may vanish — update the [accepted baseline](#2-vue-tsc--real-typecheck-not-bun-run-typecheck).

### C. ListCollection class-vs-interface (select / combobox / command)

`@zag-js/collection`'s `ListCollection` is a **class** (private members
`options/indexMap/sortFn/getByText/range`); the local copy is a **structural
interface**. Two frictions, two fixes (already applied — preserve them):
- The interface's `isEqual: (other: ListCollection<T>) => boolean` is a
  **contravariant self-reference**, which blocks the real class instance from being
  assignable to the interface. Fix: loosen the param — `isEqual: (other: any) => boolean`.
- Binding a local-interface-typed `collection` to the runtime `<Select.Root>` /
  `<Listbox.Root>` (which wants the class with its privates) fails (`TS2739`). Fix:
  a minimal `as any` cast at the `:collection` binding seam — the value is always a
  real `createListCollection()` class instance at runtime. Keep the cast tiny and
  commented.
- `CollectionItem` is `any` (matches zag). Generic threading is
  `XxxRootProps<T extends CollectionItem = CollectionItem>`.

### D. useForwardProps required-prop forwarding (navigation-menu, steps, file-upload)

When a sub-part has a REQUIRED Ark prop (`NavigationMenuItem.value`,
`StepsItem.index`, `FileUploadItem.file`), `vue-tsc` cannot prove the required prop
flows through `useForwardProps`/`useForwardPropsEmits` to the runtime component, so
it reports `TS2345`. This is a **systemic composable-typing limitation**, not a
faithfulness defect — keeping the prop required is correct per Ark. Accepted as-is.
A real fix would require changing the `useForwardProps*` composable generics (a
separate, cross-cutting task) — do not make the prop optional to silence it.

---

## Reference — component map

**Generics / collections:** `select`, `combobox`, `command`
(`<T extends CollectionItem>`, inline `CollectionItem`/`ListCollection`).
**Context-API (`Use*Context` hand-written):** `file-upload`, `select`, `tooltip`
(provider), `radio-group` (provider), the menu provider, `command`.
**Positioning abstraction (keep local `Placement` + faithful `PositioningOptions`):**
`popover`, `hover-card`, `tooltip`, `dropdown-menu`, `context-menu`, `menubar`,
`select`, `combobox`.
**Custom `context.ts` to leave untouched (non-Ark):** `avatar`, `pagination`,
`toggle-group`, `tooltip` (its `TooltipOptions`), `timeline`.
**No `types.ts` needed (non-Ark / pure HTML):** `breadcrumb`, `table`, `skeleton`,
`spinner`, `sonner`, `carousel`, `data-table`, plus the curated `date-picker`/
`datetime-picker`/`sidebar` wrappers.

---

## Definition of done (a re-sync)

A re-sync is complete only when **all** pass:

1. Robust grep (Step 5.1) → `>>> CLEAN <<<`.
2. `vue-tsc --noEmit` → only the 9 accepted baseline errors (no new ones).
3. `registry:build` → exit 0; built JSON Ark-type-free.
4. `format` → clean; shared-primitive copies still `diff`-identical.
5. Provenance stamps bumped to the resolved version; no stale versions.
6. Storybook smoke → touched components render with no console errors.
