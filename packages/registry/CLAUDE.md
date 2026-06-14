# Registry - component authoring

Conventions for authoring the component library. General monorepo rules are in
the root `CLAUDE.md`; this file adds registry-specific detail and loads when you
work under `packages/registry/`.

## Component structure

Components live in `src/components/ui/<name>/`. Each component folder contains:

- `<Name>.vue` - main component using `<script setup>` (simple components)
- `<Name>Root.vue`, `<Name>Item.vue`, ... - parts for complex components
- `types.ts` - props and emits interfaces
- `variant.ts` - CVA variants (size, variant, etc.)
- `context.ts` - provide/inject for complex components with shared state
- `namespace.ts` - dotted namespace export for complex components
- `_registry.ts` - metadata for the shadcn CLI (`registryItem`)
- `index.ts` - re-exports

Run the `create-component` command for the full authoring walkthrough.

## Key patterns

- Headless behavior from Ark UI (built on Zag.js state machines).
- Styling via Tailwind CSS v4 and class-variance-authority (CVA).
- `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge).
- `useForwardPropsEmits`, `useForwardProps`, `reactiveOmit` for prop forwarding.
- `asChild` / polymorphic rendering via `Dynamic` from `@/composables/dynamic`.
- Use the base element from `ark`, e.g. `import { ark } from '@ark-ui/vue'` and
  `<ark.button>` for base elements.
- Add `data-scope` (component name, kebab-case) and `data-part` attributes to
  styled elements; replace any legacy `data-slot` with `data-scope` / `data-part`.

## Types are decoupled from Ark

No `.vue` / `types.ts` / `context.ts` imports a TYPE from `@ark-ui/vue` or
`@zag-js` (runtime VALUE imports stay). Each `types.ts` is a faithful 1:1
hand-written copy of Ark's surface, stamped with the Ark version it was copied
from.

- Definition rules: `docs/CONTEXT-component-types-definition.md`
- Resync after an `@ark-ui/vue` upgrade: `docs/CONTEXT-component-types-resync.md`
  (or run the `resync-component-types` command).

## Composables

- Live in `src/composables/`, named in camelCase (`useForwardProps.ts`,
  `createContext.ts`). `lib/` utilities use kebab-case instead.
- Run the `create-composable` command for the pattern and the existing list.

## Storybook

Storybook lives inside this package. Config is in `.storybook/`, stories in
`stories/`.

Component stories live in `stories/components/<area>/<name>/` (where `<area>` is
`ui`, `blocks`, or `layouts`), mirroring `src/components/`, for example
`stories/components/ui/accordion/`. Each folder has:

- `<Name>.stories.ts` - story meta, argTypes, and named story exports
- `*Story.vue` - individual story variant components

The `@` alias in `vite.config.ts` points to `packages/registry/src`. Run
Storybook with `bun storybook` (root) or `cd packages/registry && bun storybook`.

## Styling and theming

Base styles and theming are in `src/styles/global.css` (OKLch color space, dark
mode via the `.dark` class). The selectable color themes (21 at present) live in
`src/themes.ts`.
