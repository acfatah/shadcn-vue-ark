# Story-Driven UI Components — Claude Context

Reusable context for building and modifying UI components in this repo with
Storybook stories as the **contract**. Read this before scaffolding,
implementing, or reviewing any `packages/registry` UI component.

> **Core rule:** Write the `*.stories.ts` `argTypes` + variant exports **first**,
> treat them as the reviewable interface, and define "done" as **every story
> export renders**. Stories are a *consumer* of the registry, never its
> generator.

---

## 1. A story is a contract, not a demo

Write the story **first**, as the typed spec the component must satisfy — not
after, as a showcase. A story carries four kinds of truth Claude can read
without running anything:

| Contract element | Lives in | Pins down |
|---|---|---|
| **API surface** | `argTypes` in `*.stories.ts` | Every prop, its type, allowed `options`, default. This *is* the public interface. |
| **Requirement list** | named exports (`Default`, `Size`, `Spinner`, `AsChild`…) | Each variant = one required capability. Missing variant = missing requirement. |
| **Usage truth** | the `*Story.vue` + `?raw` source | The exact, copy-pasteable composition, including sub-component wiring (`Component.Root` / `Component.Child`). |
| **Prose intent** | `parameters.docs.description` (from `registryItem.description`) | What it's for and references (shadcn parity). |

Reference example that already carries all four:
[Button.stories.ts](packages/registry/stories/components/ui/button/Button.stories.ts).

**Sufficiency test:** delete the component and hand Claude only the
`*.stories.ts` + the `?raw` files. If it could rebuild the component, the story
is a sufficient contract. If not, that gap is what's missing from the spec.

---

## 2. Three sources of truth — one direction, never a cycle

1. **Component code = canonical for the API.** Props/emits/slots in the `.vue`
   and the props/emits interfaces. Compiler-enforced ground truth.
2. **Story = canonical for intent and usage.** Which variants must exist, how
   it composes, what the args mean. The human/design contract.
3. **`_registry.ts` = canonical for distribution.** `name`, `dependencies`,
   `files`, and the published `description`. What ships via the shadcn CLI.

Runtime flow is strictly one-directional:

```
_registry.ts  ──(registryItem.description)──▶  *.stories.ts  (docs panel)
component code ──(argTypes mirror props)─────▶  *.stories.ts  (controls)
```

Stories **import from** the registry and the component; nothing imports from
stories. The description has exactly one home: `_registry.ts`.

**Do NOT generate registry metadata from stories at build time.** It creates a
cycle and couples the shippable `packages/registry` to the dev-only
`packages/registry`. The only bridge between story intent and registry metadata is
**Claude at authoring time** — reconcile them in-head during generation, not in
code.

**Drift warning:** `argTypes` and the component's real props have *no* compiler
link. Keeping them in agreement is the #1 failure mode of story-as-contract, so
verification (§4) must check it explicitly.

---

## 3. The pipeline — five phases, story-first

```
create-component skill (orchestrator)
  → Phase 0: write spec *.stories.ts   [HUMAN GATE: approve argTypes + variants]
  → Props/Emits interfaces   (create-component skill: references/props-emits.md)
  → _registry.ts             (create-component skill: references/registry.md)
  → context.ts               (create-component skill: references/context.md; only if shared state)
  → implement .vue until every story export renders
  → demo + variant stories   (create-component-story skill; backfill ?raw demos)
  → review-component skill + typecheck + format
```

**Phase 0 — Spec story (before any component code).** Write *only*
`*.stories.ts`: `title`, `component`, `tags: ['autodocs']`, complete `argTypes`
(the API being committed to), and one **named export per required variant**
(`.vue` files may be stubs). It won't render yet — it's a spec. **Human gate:**
review and approve the `argTypes` + variant list. You're approving an
interface, not reading an implementation — the cheapest possible review.

**Phase 1 — Scaffold.** From the approved spec, generate the skeleton via the
`create-component` skill: props/emits interfaces (`references/props-emits.md`),
`_registry.ts` (`references/registry.md`), and `context.ts` if sub-parts share
state (`references/context.md`).
Note: custom props that *can't* be forwarded to Ark UI become `context.ts`
options — those same props are exactly the ones that need `argTypes` entries.

**Phase 2 — Implement.** Fill the `.vue` files until each named story renders.
The story is the acceptance test: "component done" ≡ "every export in
`*.stories.ts` renders without error."

**Phase 3 — Backfill demos.** Each variant gets its real `*Story.vue` and the
matching `?raw` import wired into `docs.source.code`. The story flips from spec
→ documentation. Use the `create-component-story` skill (its demo and variant
sections).

**Phase 4 — Verify** (nothing here is compiler-enforced):
- Every `argTypes` key is a real public prop on the component, and vice-versa.
- Every named export renders (Storybook test-runner / storybook build).
- `_registry.ts` `dependencies` + `files` match the component's actual imports.
- `bun run format` + `typecheck` last, per repo conventions.

---

## 4. Conventions that make a story Claude-readable

Each rule removes an ambiguity Claude would otherwise guess at:

1. **One canonical export named `Default`.** It's the reference a reader learns
   the pattern from. Convention over cleverness.
2. **`argTypes` are mandatory and exhaustive — even booleans** (incl. `class`,
   `disabled`). An undocumented prop is, to a reader, a prop that doesn't exist.
3. **Variant name = capability name** (`SizeStory`, `SpinnerStory`,
   `AsChildStory`). Reconstruct the full feature set from the export list alone.
   Avoid generic names like `Story2`.
4. **`?raw` source on every variant.** Highest-trust artifact in the repo: it's
   guaranteed to compile (Storybook builds it), unlike prose that rots. When the
   question is "how is this composed," the `?raw` Vue file is the answer that
   can't lie.
5. **Description lives only in `_registry.ts`** and is pulled into the story.
6. **Sub-component wiring shown explicitly** via `subcomponents` in meta +
   `Component.Root/.Child` in the `.vue`. Compound components are where guesses
   go wrong most; the story removes the guess.

---

## 5. Discoverability — how this context self-loads

Stories are useless as context if Claude doesn't know to read them.

- **`AGENTS.md` pointer:** "When building or modifying a UI component, the
  canonical spec is its `*.stories.ts`. Read the nearest existing story in
  [packages/registry/stories/components/ui/](packages/registry/stories/components/ui/) as the pattern
  reference before writing code. A component is not complete until every story
  export renders."
- **Nearest-neighbor rule:** new component → first read the *most similar
  existing* story (compound → Accordion/Tooltip; simple → Button). Few-shot from
  a real, building example beats any abstract template.

---

## 6. File layout (recap)

Component: `packages/registry/src/components/ui/{component}/`
— `.vue` parts, props/emits interfaces, `_registry.ts`, optional `context.ts`.

Stories: `packages/registry/stories/components/ui/{component}/`
— `{Component}.stories.ts` (meta + exports), one `{Variant}Story.vue` per
capability, `items.ts` for complex data.

---

### The one idea to keep

Write the `argTypes` + variant exports **first**, review *that* as the
interface, and treat "every export renders" as the definition of done.
Everything else — registry, context, docs — hangs off that contract, and
stories stay a *consumer* of the registry, never its generator.
