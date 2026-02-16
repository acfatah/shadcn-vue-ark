import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'badge',
  title: 'Badge',

  description: html`
    Displays a badge or a component that looks like a badge.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/badge
  `,

  dependencies: [
    '@vueuse/core',
    'class-variance-authority',
  ],

  files: [
    {
      path: 'src/composables/useForwardPropsEmits.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardPropsEmits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
