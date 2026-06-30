---
name: create-component-story
description: Author a comprehensive Storybook story for a packages/registry UI component to the proven registry bar (static CSF3 meta, renderRaw helper, exhaustive argTypes, per-archetype play tests, a11y gate). Use when creating or upgrading a *.stories.ts under stories/components/ui/. Encodes the full playbook from authoring all 62 components (Waves 0-5).
---

# Create a component story (registry bar)

The whole registry (62 components) is authored to this bar. Copy the
closest exemplar, then adapt. The gates in `stories/__checks__/`
(`story-shape`, `argtypes-drift`) plus `a11y` enforce it.

| Tier | Exemplar | Shows |
|---|---|---|
| T1 simple | `badge/`, `button/` | lean static primitive; Variants/Sizes/Demo, no play |
| T2 in-flow | `switch/`, `tabs/` | state matrix + toggle/select `play()` |
| T3 portal | `dialog/`, `dropdown-menu/`, `select/` | open state + teleported `play()` |
| T4 composite | `data-table/`, `calendar/`, `input/` | fixtures/pinned dates; sub-flow `play()`; collection |

## Layout

`stories/components/ui/<kebab>/`:

- `<Name>.stories.ts` - meta + named story exports.
- `*Story.vue` - one per scenario; this file IS the `?raw` docs source.
- optional `*.ts` fixture (`payments.ts`) for heavy data/columns.
- Any other `.vue` in the dir (a story helper) MUST be referenced by the
  `.stories.ts` or `story-shape` flags it as an orphan. If it reads
  component context it can't render standalone - register it in a story's
  render `components` map. Delete only untracked stray files; wire a
  tracked one as a real story.

## Meta head (MUST be a static object literal)

Never wrap the meta in a helper - Storybook's CSF indexer rejects a
function-wrapped default export (`NoMetaError`). Keep `title`/`tags`
literal.

```ts
const meta = {
  title: 'Components/UI/<Name>',
  component: Foo,                              // flat
  // component: docsRoot(Foo.Root, 'Foo.Root'),  // namespace: wrap the Root
  // subcomponents: { 'Foo.Part': Foo.Part },    // dotted string keys only
  tags: ['autodocs'],
  args: { /* default control values */ },
  argTypes: { /* see drift rule */ },
  parameters: {
    docs: { description: { component: registryItem.description } },
    a11y: { test: 'error' },                  // once axe is clean
  },
} satisfies Meta<typeof Foo>
```

Typing: use `satisfies Meta<typeof Foo>` by default. If the component has
a REQUIRED prop supplied per-story inside the `*Story.vue` (e.g.
`collection` on select/combobox, `panels` on resizable), `satisfies`
forces that prop into every story's `args` and typecheck fails - switch
to the annotation form `const meta: Meta<typeof Foo.Root> = { ... }`
(drop `satisfies`). Drift/shape gates work with either.

## Story bodies: use `renderRaw`

`renderRaw(StoryComponent, RawSource, opts?)` pins the `?raw` source and
deep-merges extra parameters. Options: `source`, `description`
(story-level), `parameters` (e.g. `controls.exclude`, an a11y override).

```ts
export const Default: Story = { ...renderRaw(FooDefaultStory, FooDefaultSource) }

export const Open: Story = {
  args: { defaultOpen: true },
  ...renderRaw(FooDefaultStory, FooDefaultSource, {
    description: 'Render the panel open; a11y runs against the open state.',
  }),
}
```

Arg builders (`_helpers/args.ts`): `selectArg(options, default)`,
`boolArg(desc?)`, `classArg()`, `stateArgs(['invalid','disabled','loading'])`.

Exception - one shared host + a trigger (e.g. `sonner`): `renderRaw`
renders a single component, so write a small local render that mounts
both via `<Teleport>` and pins the trigger `?raw`. See `sonner/`.

## argTypes vs props (drift gate)

When the component is in `conformant.ts`, `meta.argTypes` keys MUST equal
the component's runtime props exactly (minus key/ref/ref_for/ref_key/
style/default). List every prop, even plumbing (`id`, `ids`, `form`);
`{ control: false }` for function props, `{ control: 'object' }` for
object props. Run `bun run check:argtypes` - it prints the exact
phantom/missing set, so this is mechanical.

- The check reads RUNTIME props of `meta.component`. The registry Root
  often flattens Ark positioning into `side`/`align`/`sideOffset`/
  `alignOffset` and adds `class` - include those; they are real props.
- `/* @vue-ignore */` on an `extends` clause means the inherited props
  are NOT runtime props (e.g. `Input.Text` exposes only `class`).
- Collection components (`input`): the meta tracks ONE base component
  (`Input.Text`); the per-alias stories keep their own story-level
  argTypes. Drift only reads meta-level argTypes.

## Per-tier exports

- T1: `Default`, `Variants`/`Sizes` (C), `Overflow` (C), `Demo` (last). No play.
- T2: `Default` + the "on" state, `Disabled`, `Invalid`/`Loading`/`Readonly`
  (C), `Controlled` (C), `Demo`; one `play()`.
- T3: T2 plus `Open` (`defaultOpen`/`defaultValue`), `Placement`/`Side+Align`
  (C), `WithForm`/`ScrollableContent` (C), `Empty`/`NoResults` (filterable);
  teleported `play()`.
- T4: domain states, `Empty`/`Loading`, pinned fixtures, multiple demos;
  `play()` per core sub-flow.

`Demo*` exports sort last (shape gate). Non-interactive members of any
tier (progress, breadcrumb, table) get the matrix + a11y but NO play.

## play() recipes (`storybook/test`)

Import `expect, userEvent, within, screen, waitFor, fireEvent` as needed.
Portal rule: query the trigger via `canvas`, teleported content via
`screen` / `document.querySelector('[data-scope][data-part="content"]')`
- never `within(canvasElement)`. Assert `data-state`, not visibility
(panels animate). Always `findBy*`/`waitFor` after an open/close.

| Archetype | Recipe |
|---|---|
| Toggle (switch/checkbox/toggle) | Ark exposes a hidden input + `data-state` on the control; click the control via `[id$=":control"]` (not the aria-labelledby label), assert the hidden input checked |
| Radio | `getAllByRole('radio', { hidden: true })` + `.value` |
| Floating (tooltip/hover-card) | zero `openDelay`/`closeDelay` in the story args, `userEvent.hover`, assert content `data-state`, `unhover` |
| Overlay (dialog/sheet/drawer/popover) | click trigger, `screen.findByRole('dialog')`, assert `data-state=open`, `keyboard('{Escape}')`, waitFor closed |
| Menu (dropdown/menubar) | open, `screen.findByRole('menu')`, ArrowDown -> `[data-highlighted]`, Escape; DROP focus-return asserts (flaky under load) |
| Context menu | open with `fireEvent.contextMenu(trigger)` |
| Nav menu | content renders in an in-flow viewport - query via `canvas`, assert trigger `data-state` |
| Typeahead (combobox/select) | open, type a specific term, assert `getAllByRole('option')` has length 1, click it, trigger reflects value |
| Calendar | pin the date; click a day by its unambiguous number, assert `data-selected` |
| Date/time picker | open, query teleported day cells by the date-agnostic `/^Choose /` aria-label |
| Number/pin/tags/editable | increment & assert value changed / type fills slots / Enter commits a tag / Edit->type->Submit (Ark labels the button "submit") |
| File upload | `userEvent.upload(input[type=file], new File(...))`, assert the name appears |
| Carousel/steps/resizable/sidebar | Prev disabled->Next enables / Next swaps panel / focus separator + ArrowRight changes aria-valuenow / trigger toggles `data-state` |
| Toast (sonner) | fire a toast, assert appearance via `screen.findByText` (never disappearance) |

## Determinism

No `Date.now()`/`Math.random()` in `*Story.vue`. Pin calendar dates via
`@internationalized/date` (`new CalendarDate(2026, 6, 15)`), never
`new Date()`/`today()`. `waitFor`/`findBy*` after async, never bare
timeouts. `test:stories` has a cold-start flake (~1 file on the first
cold run); re-run or check isolated before treating a failure as real.

## a11y

Global default is `a11y.test: 'todo'` (reports, never reds). Promote a
component's meta to `a11y: { test: 'error' }` once its stories pass axe
clean. Two failure kinds:

- Story-only (a demo's missing label/low contrast): FIX in the story
  (add `aria-label`, `alt=""`, wire `ids` to a real element). Ark
  auto-wires `aria-labelledby` to an `ids.*` element unconditionally; if
  the registry exposes a matching part you can point `ids` at a real
  element (popover title), otherwise it's a component defect.
- Component-source defect (no part to label, wrong role): you must NOT
  edit `src/components/**`. Disable only that rule, tag it, and log a
  ledger row in `docs/story-defect-log.md` (next `SDL-xxx`).

```ts
a11y: {
  test: 'error',
  // KNOWN-BUG: SDL-xxx <one-line reason>
  config: { rules: [{ id: '<rule>', enabled: false }] },
}
```

Story-level `a11y.config.rules` REPLACES the meta array (not merge) - if
one story adds a disable, re-list the meta's disables too. Never a bare
`a11y: { test: 'off' }`. Common recurring defects (see the ledger):
Ark dangling `aria-labelledby` -> name rules (`button-name`,
`aria-input-field-name`, `aria-dialog-name`); icon-only triggers ->
`button-name`; native controls in minimal demos -> `label`; composite
roles -> `aria-required-children`.

## Finish (run from packages/registry)

1. add the component to `stories/__checks__/conformant.ts`
2. `bun run check:argtypes`   (fix phantom/missing until green)
3. `bun run typecheck:stories`
4. `bun run test:stories <kebab>`   (render + play + a11y; re-run once if a cold flake)
5. `bun run storybook:build`   (0 index errors)
6. `bun run format <files>`   (lint last; no redundant `name:` on stories)
