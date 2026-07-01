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
- For animations/keyframes use `cssVars` + `css` (Tailwind v4), NOT a
  `tailwind.config` block.
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
