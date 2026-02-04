import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'collapsible',
  title: 'Collapsible',

  description: html`
    An interactive component which expands/collapses a panel.

    References:
    - Headless API: https://ark-ui.com/docs/components/collapsible
    - shadcn/ui: https://ui.shadcn.com/docs/components/collapsible
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/composables/use-forward-props-emits.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props-emits.ts',
    },
  ],

  tailwind: {
    config: {
      theme: {
        extend: {
          animation: {
            '--animate-collapsible-down': 'collapsible-down 0.25s ease-out',
            '--animate-collapsible-up': 'collapsible-up 0.25s ease-out',
          },
          keyframes: {
            'collapsible-down': {
              from: { height: '0' },
              to: { height: 'var(--height)' },
            },
            'collapsible-up': {
              from: { height: 'var(--height)' },
              to: { height: '0' },
            },
          },
        },
      },
    },
  },
} satisfies RegistryItem

export default registryItem
