# Create _registry.ts

Analyze the components in the given directory (or directories) and create a
`_registry.ts` file for each using the Accordion pattern below as reference.
Skip all tests. Use spaces instead of tabs.

## Rules

- `_registry.ts` carries metadata only. The build scans the component's own
  files and their `import` statements automatically, so do NOT list the
  component's `.vue`/`index.ts`/`types.ts` files.
- NEVER list `src/composables/*` or `src/lib/*` in `files[]`. They are their own
  registry items, auto-resolved via `registryDependencies`; the build THROWS if
  you list them. `files[]` is only for non-scanned extras (rare, e.g. a
  component-local `styles.css`), so usually omit it entirely.
- `dependencies` is only for npm packages the import scanner cannot infer (e.g.
  `tw-animate-css`).
- For custom CSS the component needs (a `@utility` class, `@keyframes`, or a
  `--animate-*` / theme token) use `cssVars` + `css` (Tailwind v4), NOT a
  `tailwind.config` block. Never hardcode it in `src/styles/global.css` and rely
  on it being there - see "Component-owned CSS" below.
- See `docs/CONTEXT-registry-packaging.md` for the full packaging model.

## Pattern (Accordion example)

```ts
import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'accordion',
  title: 'Accordion',

  description: html`
    A vertically stacked set of interactive headings that each reveal a section of content.

    References:
    - Headless API: https://ark-ui.com/docs/components/accordion
    - shadcn/ui: https://ui.shadcn.com/docs/components/accordion
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  cssVars: {
    theme: {
      '--animate-accordion-down': 'accordion-down 0.25s ease-out',
      '--animate-accordion-up': 'accordion-up 0.25s ease-out',
    },
  },

  css: {
    '@keyframes accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--height)' },
    },
    '@keyframes accordion-up': {
      from: { height: 'var(--height)' },
      to: { height: '0' },
    },
  },
} satisfies RegistryItem

export default registryItem
```

## Component-owned CSS (utilities, keyframes, tokens)

If a component depends on custom CSS, that CSS is the component's own concern:
ship it through the component's `css` / `cssVars` so `shadcn add <component>`
writes it into the consumer's stylesheet. Do NOT hardcode it in the registry's
`src/styles/global.css` and assume it reaches the consumer - that file is the
Storybook/base theme; a consumer who installs only your component (or keeps
their own `global.css`) will not get it, and the class silently no-ops.

Rules:

- **Each consumer is self-sufficient.** If two components use the same utility
  and neither depends on the other, declare it in BOTH `_registry.ts` files.
  Duplicate `@utility` blocks are idempotent on install. Example: `no-scrollbar`
  ships from both `scroll-area` and `time-picker` (`time-picker` does not depend
  on `scroll-area`).
- **Storybook parity lives elsewhere.** The `css` field only reaches consumer
  installs, never the registry's own Storybook. If the registry's stories need
  the CSS to render, re-declare it in `packages/registry/.storybook/global.css`
  (the Storybook-local entry), NOT in `src/styles/global.css`.
- **Shape.** Nested objects become nested CSS. Keys containing `-`, `&`, or `::`
  must be quoted strings. `@utility <name>` and `@keyframes <name>` are valid
  top-level keys - shadcn's `css` schema is an open record, so any at-rule is
  allowed.

`@utility` class (the `no-scrollbar` case):

```ts
css: {
  '@utility no-scrollbar': {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
},
```

Animation (the Accordion case above): `@keyframes` in `css`, the `--animate-*`
token in `cssVars.theme`.

Component-local stylesheet (rare): if the CSS is large or better kept in a file
(the `sonner` case), ship a component-local `styles.css` via `files[]` with an
explicit `registry:file` type plus a `css` `@import` entry, instead of an inline
`css` object.
