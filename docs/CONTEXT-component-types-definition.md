# Component Types Definition (Decoupling from @ark-ui/vue)

Reusable AI-agent context for **defining all component prop/emit/detail/context
types directly inside each component's `types.ts`**, so that no `.vue`, `types.ts`,
or `context.ts` file under `packages/registry/src/components/ui/` imports a *type*
from `@ark-ui/vue` (or its re-exported `@zag-js/*` types).

This is the **types companion** to
[`CONTEXT-ui-component-structure.md`](./CONTEXT-ui-component-structure.md). That
doc defines the file anatomy, categories, and `.vue` skeletons; **this doc only
governs where types come from**. When the two agree, follow the structure doc for
layout and this doc for type origin. Assumes familiarity with Vue 3
`<script setup>`, TypeScript, and the existing component conventions.

The two proven exemplars of the target state already in the repo:
`file-upload/types.ts` and `date-picker/types.ts` (the latter wraps a complex Ark
component yet imports **zero** Ark types).

---

## Why this refactor exists

The shadcn registry **ships raw component source**. When a consumer runs
`shadcn add accordion`, the built `public/r/accordion.json` embeds the literal
`.vue` text — including any `import type { AccordionRootProps } from '@ark-ui/vue/accordion'`.

That single import drags in a deep generic chain:

```
AccordionRootProps
  └─ AccordionRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps
       └─ RootProps  (re-exports @zag-js/accordion types)
            └─ @zag-js/accordion → @zag-js/types, @zag-js/core (machines, services…)
  └─ HTMLAttributes (vue)
```

In a consumer project this surfaces as **"Type instantiation is excessively deep
and possibly infinite"**, slow `vue-tsc`, heavy editor type-checking, and a hard
transitive coupling to `@zag-js` internals the consumer never asked for. The fix
is to **hand-write a faithful, flat interface** in `types.ts` that the wrapper
component (and the consumer) can resolve without ever touching Ark's generics.

**Goal:** every file copied into a consumer project resolves its types from
itself, plus `vue` and legitimate external runtime libraries — never from
`@ark-ui/vue`/`@zag-js`.

---

## The rule

1. **Tier 3 — fully self-contained.** No `@ark-ui/vue` type import survives
   anywhere in a component (`.vue`, `types.ts`, `context.ts`). Also eliminate the
   `@zag-js/*` *detail* types that Ark re-exports (inline them).
2. **Faithful 1:1.** Reproduce Ark's prop/emit surface **verbatim** — every prop,
   its exact type, and its JSDoc/`@default` annotation. The component's public API
   must not change. Do **not** curate or drop props.
3. **Runtime imports stay.** Only *type* imports move. The value import
   `import { Accordion } from '@ark-ui/vue/accordion'` (and `ark`, `mergeProps`,
   etc.) remains — Ark is still the runtime engine and stays in `_registry.ts`
   `dependencies`.
4. **Keep non-Ark external types.** `HTMLAttributes`/`ComputedRef` from `vue`,
   `DateValue` from `@internationalized/date`, `VariantProps` from
   `class-variance-authority`, `ToasterProps` from `vue-sonner`, etc. are
   legitimate dependencies the consumer already installs — **leave them**.
5. **Drift is handled manually.** Stamp each `types.ts` with a provenance comment
   (see below) and re-sync by hand on `@ark-ui/vue` upgrade. No generated code, no
   type-equivalence tests.

---

## What to eliminate (four kinds of Ark type import)

| Kind | Looks like | Action |
|---|---|---|
| **Props/Emits interfaces** | `import type { AccordionRootProps } from '@ark-ui/vue/accordion'` | Hand-write `XxxRootProps` / `XxxRootEmits` in `types.ts`, faithful 1:1. |
| **`PolymorphicProps`** | `import type { PolymorphicProps } from '@ark-ui/vue'` | Replace `extends PolymorphicProps` with an inline `asChild?: boolean` (see below). |
| **Leaf detail types** | `ValueChangeDetails`, `FileMimeType`, `CollectionItem`, `ListCollection`, `FocusChangeDetails`… | Inline the interface/type into `types.ts` (they originate in `@zag-js/*` and are small). |
| **Context API types** | `import type { UseFileUploadContext } from '@ark-ui/vue/file-upload'` (in `context.ts`) | Hand-write the context interface in `types.ts` and import it into `context.ts`. The heaviest lift — see [Context API types](#context-api-types-the-heavy-lift). |

### Inlining `PolymorphicProps`

`PolymorphicProps` is literally:

```ts
export interface PolymorphicProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
```

So `interface Props extends PolymorphicProps { class?: HTMLAttributes['class'] }`
becomes a hand-written `XxxProps` in `types.ts` carrying `asChild?: boolean`. Most
Category 3 (e.g. Card, Alert) and a few Category 1 (Kbd, Badge) components only
ever import `PolymorphicProps` — for them the entire job is adding/extending a
`types.ts` with `asChild?: boolean` (+ `class`) and pointing the `.vue` at it.

---

## Target shape

`types.ts` becomes the **single source of truth** for the component's entire type
surface. `.vue` files import only from `./types`; `context.ts` imports its context
type from `./types`.

```ts
// accordion/types.ts
// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/accordion@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/accordion) ────────────────────────────
export interface ValueChangeDetails {
  value: string[]
}

export interface FocusChangeDetails {
  value: string | null
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface AccordionRootProps {
  /** 
   * Use the provided child element as the default rendered element. 
   */
  asChild?: boolean

  /**
   * Whether an accordion item can be closed after it has been expanded.
   * @default false
   */
  collapsible?: boolean

  /** The initial value of the expanded accordion items (uncontrolled). */
  defaultValue?: string[]

  /** Whether the accordion items are disabled */
  disabled?: boolean

  /** The unique identifier of the machine. */
  id?: string

  /** The ids of the elements in the accordion. Useful for composition. */
  ids?: Partial<{
    root: string
    item: (value: string) => string
    itemContent: (value: string) => string
    itemTrigger: (value: string) => string
  }>

  /** The v-model value of the accordion */
  modelValue?: string[]

  /**
   * Whether multiple accordion items can be expanded at the same time.
   * @default false
   */
  multiple?: boolean

  /**
   * The orientation of the accordion items.
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'
}

export interface AccordionRootEmits {
  /** The callback fired when the focused accordion item changes. */
  'focusChange': [details: FocusChangeDetails]

  /** The callback fired when expanded/collapsed items change. */
  'valueChange': [details: ValueChangeDetails]

  /** The callback fired when the model value changes. */
  'update:modelValue': [value: string[]]
}

// ── Sub-parts (minimal — usually just asChild) ───────────────────────────────
export interface AccordionItemProps {
  asChild?: boolean

  /** The value of the accordion item. */
  value: string

  /** Whether the accordion item is disabled. */
  disabled?: boolean
}

export interface AccordionItemContentProps {
  asChild?: boolean
}

export interface AccordionItemTriggerProps {
  asChild?: boolean
}
```

The `.vue` files then stop importing from Ark for types:

```vue
<!-- Before: AccordionRoot.vue -->
<script setup lang="ts">
import type { AccordionRootProps } from '@ark-ui/vue/accordion'  // ❌ remove
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'                 // ✅ runtime import stays
// ...
interface Props extends AccordionRootProps {
  class?: HTMLAttributes['class']
}
</script>
```

```vue
<!-- After: AccordionRoot.vue -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'                 // ✅ unchanged
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { AccordionRootEmits, AccordionRootProps } from './types'  // ✅ local

interface Props extends AccordionRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<AccordionRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>
```

> Keep the existing `.vue` conventions intact: local `interface Props extends
> XxxProps { class?: HTMLAttributes['class'] }`, `reactiveOmit(props, 'class')`,
> `useForwardPropsEmits`, `cn()`, import ordering. Only the *type source* changes.
> See `CONTEXT-ui-component-structure.md` → "Key conventions in .vue files".

---

## Extraction workflow (per component)

1. **Find the Ark `.d.ts` source.** Components map to an Ark subpath (sometimes a
   different name than the directory):

   ```bash
   ARK=$(find node_modules/.bun -path '*@ark-ui+vue@*/node_modules/@ark-ui/vue/dist/components' -type d | sort | tail -1)
   ls "$ARK/accordion"            # *.types.d.ts holds RootProps / RootEmits / detail types
   cat "$ARK/accordion/accordion.types.d.ts"
   cat "$ARK/accordion/use-accordion-context.d.ts"   # context API type
   ```

   Directory → Ark subpath mapping that is **not** 1:1:

   | Component dir | Ark subpath |
   |---|---|
   | `calendar`, `range-calendar` | `date-picker` |
   | `command` | `listbox` (+ `dialog` for the modal wrapper) |
   | `drawer`, `sheet` | `dialog` |
   | `context-menu`, `dropdown-menu`, `menubar` | `menu` |
   | `resizable` | `splitter` |

2. **Copy `RootProps` → `XxxRootProps`**, verbatim, keeping every JSDoc and
   `@default`. Use Ark's `RootProps` (the Vue-shaped one in
   `*.types.d.ts`), *not* the raw `@zag-js` props — Ark already maps `value`/
   `onValueChange` into `modelValue` + a `RootEmits` shape for Vue.
3. **Copy `RootEmits` → `XxxRootEmits`**, including `update:modelValue` and any
   `xxxChange` tuples.
4. **Inline detail types.** Each `accordion.ValueChangeDetails`-style reference
   resolves to a small interface in `@zag-js/<comp>/dist/<comp>.types.d.ts`. Copy
   that interface into `types.ts` and drop the namespace qualifier.
5. **Handle `PolymorphicProps`** → inline `asChild?: boolean` (see above).
6. **Copy each sub-part `XxxPartProps`.** Most are just `{ asChild?: boolean }`
   plus a couple of part-specific props (e.g. `AccordionItemProps.value`).
7. **Hand-write the context type** if `context.ts` imports `UseXxxContext` (see
   below).
8. **Re-point imports**: `.vue` and `context.ts` import from `./types`; delete the
   `@ark-ui/vue` type imports; keep value imports.
9. **Stamp** the provenance comment with the resolved Ark version.
10. Run the [definition of done](#definition-of-done).

---

## Generics & collections

`Select`, `Combobox`, and `Command` are generic over a collection item type. Ark
exposes `CollectionItem` and `ListCollection`. Inline a faithful, self-contained
version rather than importing them:

```ts
// select/types.ts
export interface CollectionItem {
  [key: string]: any
}

export interface SelectRootProps<T extends CollectionItem = CollectionItem> {
  /** The collection of items */
  collection: ListCollection<T>
  /** The controlled value of the select */
  modelValue?: string[]
  // ...rest of the Ark SelectRootProps surface, faithful 1:1
}
```

- Inline `ListCollection` as the minimal structural interface the wrapper relies
  on, or re-derive it; check the actual `@zag-js/collection` `.d.ts` and keep only
  the public shape the component's props/emits reference.
- Preserve any existing local generic aliases (e.g. `select/types.ts` already
  defines `Placement` derived from positioning) — re-anchor them to the
  hand-written props instead of `SelectRootProps<CollectionItem>` from Ark.
- These three are the **highest-risk** extractions; verify with `typecheck` and a
  Storybook smoke test that selection/typeahead still type-check and render.

---

## Context API types (the heavy lift)

When `context.ts` does `createContext<UseXxxContext>(...)`, that `UseXxxContext`
is a deep generic API surface (`getRootProps()`, `setValue()`, reactive getters,
etc.). Hand-write a faithful interface in `types.ts` and import it:

```ts
// types.ts — faithful copy of @ark-ui/vue's UseAccordionContext surface
export interface AccordionApi {
  focusedValue: string | null
  value: string[]
  setValue: (value: string[]) => void
  getItemState: (props: { value: string, disabled?: boolean }) => {
    expanded: boolean
    focused: boolean
    disabled: boolean
  }
  // ...all public methods/getters the component tree actually consumes
}

export type UseAccordionContext = AccordionApi
```

```ts
// context.ts — now Ark-free
import { createContext } from '@/composables/createContext'

import type { UseFileUploadContext } from './types'

export const [FileUploadProvider, useFileUploadContext]
  = createContext<UseFileUploadContext>('FileUploadContext')
```

Pragmatic guidance:
- Copy only the **public** members of the Ark `Use*Return`/`*Api` surface that the
  component's children actually call. Faithful means matching what is used and
  exposed, not transcribing private internals.
- The `ContextProvider.vue` bridge still calls Ark's *runtime*
  `useXxxContext()` — that's a value import and **stays**. Only the *type*
  annotation on `createContext<…>` moves to the local interface. (See
  `CONTEXT-ui-component-structure.md` → "Ark context bridge".)
- Components that need this: any with a `context.ts` importing `Use*Context`
  (e.g. file-upload, and Select which augments Ark's context with `loading`/
  `invalid`).

---

## Shared Ark primitives → per-component copies

Several components wrap the **same** Ark primitive but do **not** depend on each
other in the registry, so each must own its **own copy** of the hand-written
types (a consumer may add only one of them):

| Ark primitive | Components that each need their own copy |
|---|---|
| `menu` | context-menu, dropdown-menu, menubar |
| `dialog` | dialog, drawer, sheet, command (modal wrapper) |
| `date-picker` | calendar, range-calendar (and date-picker/datetime-picker already done) |

**Exception — registry dependencies.** When component B lists component A in
`_registry.ts` `registryDependencies`, B *may* import shared types from A's
barrel. Precedent: `date-picker/types.ts` does
`export type { LayoutTypes } from '../calendar/types'` because date-picker depends
on calendar. Use this only along an existing `registryDependencies` edge; never
create a new cross-component type import that isn't backed by one.

Practically: write the canonical Menu / Dialog / DatePicker type set **once**
(e.g. start from dropdown-menu, dialog, calendar), get it right, then replicate
into the siblings. Keep the copies identical so re-sync stays mechanical.

---

## Provenance & re-sync

> **Upgrading `@ark-ui/vue`?** Follow the dedicated maintenance procedure in
> [`CONTEXT-component-types-resync.md`](./CONTEXT-component-types-resync.md) — it
> covers the per-component diff loop, the shared-primitive copies, the verification
> gates (robust grep, `vue-tsc` vs `tsc`), the accepted-error baseline, and the
> runtime-binding landmines (DateValue, ListCollection, PositioningOptions).

Stamp the top of every hand-written `types.ts`:

```ts
// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/<name>@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.
```

- Use the **resolved installed version** (currently `@ark-ui/vue@^5.37.0` in
  `packages/registry/package.json`). Note `file-upload/types.ts` currently stamps
  `5.36.2` — bring it to the resolved version when you touch it.
- On upgrade: bump the version, diff the relevant Ark `.d.ts` against the
  hand-written interface, and apply any prop/emit/detail changes.

---

## Definition of done (per component)

A component is complete only when **all** pass:

1. **typecheck** — `cd packages/registry && bun run typecheck` (vue-tsc) clean.
2. **registry rebuilt** — `bun run registry:build` so `public/r/*.json` re-embeds
   the new Ark-free source; review the diff. Update `_registry.ts` `files`/
   `dependencies` only if imports actually changed (Ark stays a runtime dep).
3. **lint/format** — `bun run format packages/registry/src/components/ui/<name>`
   (antfu config: import order, single quotes, 2-space indent).
4. **Storybook smoke** — the component's story still renders with no console
   errors (manual, or via the `verify` skill). Critical for the generic/collection
   and context-heavy components.

**Verify zero Ark type imports remain** in the component:

```bash
grep -rn "import type.*@ark-ui/vue\|import type.*@zag-js" \
  packages/registry/src/components/ui/<name>
# expect: no output
```

---

## Anti-patterns specific to this refactor

| Anti-pattern | Correct approach |
|---|---|
| `interface Props extends XxxRootProps` importing `XxxRootProps` from Ark | Hand-write `XxxRootProps` in `types.ts`, import from `./types` |
| Curating / dropping props "we don't use" | Faithful 1:1 — copy the full Ark surface with JSDoc |
| Keeping `import type { PolymorphicProps }` | Inline `asChild?: boolean` |
| Leaving leaf detail types imported from Ark/zag | Inline the small interface into `types.ts` |
| Removing the Ark **runtime** value import | Keep it — only *type* imports move; Ark stays a runtime dep |
| Inlining `DateValue`, `VariantProps`, `ToasterProps`, vue types | Keep those — scope is strictly `@ark-ui/vue` + its `@zag-js` types |
| Cross-importing types from a sibling component without a `registryDependencies` edge | Each component owns its own copy unless a registry dependency already links them |
| Forgetting to re-stamp the provenance version | Always stamp the resolved `@ark-ui/vue` version |

---

## Quick checklist

- [ ] Locate the Ark `.d.ts` (mind the dir→subpath mapping).
- [ ] `types.ts`: hand-write `XxxRootProps` + `XxxRootEmits` (faithful 1:1, JSDoc).
- [ ] Inline all leaf **detail** types; drop the `@zag-js` namespace qualifier.
- [ ] Inline `PolymorphicProps` → `asChild?: boolean`.
- [ ] Copy every sub-part `XxxPartProps`.
- [ ] Hand-write `UseXxxContext` if `context.ts` needs it; re-point `context.ts`.
- [ ] Re-point every `.vue` type import to `./types`; keep runtime imports.
- [ ] Stamp provenance comment with the resolved Ark version.
- [ ] `grep` confirms zero `@ark-ui/vue` / `@zag-js` **type** imports remain.
- [ ] typecheck · registry rebuild · format · Storybook smoke all pass.
</content>
