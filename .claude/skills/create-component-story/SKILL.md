---
name: create-component-story
description: Author a comprehensive Storybook story for a packages/registry UI component to the pilot-proven bar (static CSF3 meta, renderRaw helper, exhaustive argTypes, per-archetype play tests, a11y gate). Use when creating or upgrading a *.stories.ts under stories/components/ui/.
---

# Create a component story (registry bar)

Encodes the bar set by the Wave 1 pilot. Canonical exemplars to copy from:

| Tier | Exemplar | Shows |
|---|---|---|
| T1 simple | `stories/components/ui/badge/` | lean static primitive, Variants/Overflow/Demo |
| T2 in-flow | `stories/components/ui/switch/` | full state matrix + toggle `play()` |
| T3 portal | `stories/components/ui/dialog/` | open state + portal `play()` (open/dismiss/focus) |
| T4 composite | `stories/components/ui/data-table/` | fixture data + pagination/filter `play()` |

## Layout

`stories/components/ui/<kebab>/`:

- `<Name>.stories.ts` - meta + named story exports.
- `*Story.vue` - one per scenario; this file IS the `?raw` docs source.
- optional `*.ts` fixture (e.g. `payments.ts`) for heavy data/columns.

## Meta head (MUST be a static object literal)

Do NOT wrap the meta in a helper. Storybook's CSF indexer rejects a
function-wrapped default export (`NoMetaError: default export must be an
object`), and `storybook build` + the addon-vitest test runner both index
statically. Keep `title` and `tags` literal:

```ts
const meta = {
  title: 'Components/UI/<Name>',
  component: Foo,                       // flat: the component
  // component: docsRoot(Foo.Root, 'Foo.Root'),  // namespace: wrap the Root
  // subcomponents: { 'Foo.Part': Foo.Part },    // dotted string keys only
  tags: ['autodocs'],
  args: { /* default control values */ },
  argTypes: { /* see drift rule */ },
  parameters: {
    docs: { description: { component: registryItem.description } },
    a11y: { test: 'error' },           // only once axe is clean; else omit
  },
} satisfies Meta<typeof Foo>
```

## Story bodies: use `renderRaw`

`renderRaw(StoryComponent, RawSource, opts?)` pins the `?raw` source and merges
extra parameters (no spread-then-override footgun). Options: `source`,
`description` (story-level), `parameters` (e.g. `controls.exclude`).

```ts
export const Default: Story = { ...renderRaw(FooDefaultStory, FooDefaultSource) }

export const Variants: Story = {
  ...renderRaw(FooVariantsStory, FooVariantsSource, {
    parameters: { controls: { exclude: ['variant'] } },
  }),
}
```

Arg builders (`stories/_helpers/args.ts`): `selectArg(options, default)`,
`boolArg(desc?)`, `classArg()`, `stateArgs(['invalid','disabled','loading'])`.

## argTypes vs props (drift gate)

When the component is in `stories/__checks__/conformant.ts`, `meta.argTypes` keys
MUST equal the component's public props exactly (minus key/ref/ref_for/ref_key/
style/default). List every prop, even plumbing ones (`id`, `ids`, `form`); use
`{ control: false }` for function props. Run `bun run check:argtypes` - it
reports the exact phantom/missing keys.

## Per-tier exports

- T1: `Default`, `Variants` (C), `Overflow` (C), `Demo` (last). No play.
- T2: `Default` + the "on" state, `Disabled`, `Invalid`/`Loading`/`Readonly`
  (C), `Controlled`, `Demo`; one `play()`.
- T3: T2 plus `Open` (`defaultOpen`), `ScrollableContent`/`WithForm` (C); portal
  `play()`.
- T4: domain states, `Empty`/`Loading`, multiple demos; `play()` per sub-flow.

`Demo*` exports sort last (shape gate).

## play() recipes (`storybook/test`)

Import `expect, userEvent, within, screen, waitFor` from `storybook/test`.

- Toggle: assert state, click control, assert flipped. Ark toggles expose a
  hidden checkbox + `data-state` on the control, not `role="switch"`:
  `getByRole('checkbox', { hidden: true })` + click `[id$=":control"]`.
- Overlay/portal: query the trigger via `canvas`, the teleported panel via
  `screen` (never `canvas`). Assert `data-state="open"` (panels animate, so
  `toBeVisible` flaps), `keyboard('{Escape}')`, `waitFor` data-state closed and
  focus return.
- Typeahead/table: type to filter, `waitFor` the matching row, assert a
  non-match is gone.

Determinism: no `Date.now()`/`Math.random()`; `waitFor`/`findBy*` after async,
never bare timeouts; pin calendar dates via `@internationalized/date`.

## a11y

Global default is `a11y.test: 'todo'` (reports, never reds). When a component's
stories pass axe clean, promote its meta to `a11y: { test: 'error' }`. For a real
component defect you must not fix, disable only that rule on that story and add a
ledger row:

```ts
parameters: {
  a11y: { test: 'error', config: { rules: [{ id: '<rule>', enabled: false }] } },
  // KNOWN-BUG: SDL-xxx <reason>
}
```

Never a bare `a11y: { test: 'off' }` on a meta. Story-only defects (e.g. a demo's
low-contrast color) are fixed in the story; component-source defects are logged
to `docs/story-defect-log.md`, never fixed (no `src/components/**` edits).

## Finish

1. `bun run typecheck:stories`
2. `bun run check:argtypes`   (add the component to `conformant.ts` first)
3. `bun run test:stories -- <kebab>/<Name>.stories`   (render + play + a11y)
4. `bun run storybook:build`
5. `bun run format <files>`   (lint last)
