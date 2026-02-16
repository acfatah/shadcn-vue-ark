import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'button-group',
  title: 'Button Group',

  description: html`
    A container that groups related buttons together with consistent styling.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/button-group
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
  ],

  files: [
    {
      path: 'src/composables/dynamic.ts',
      type: 'registry:file',
      target: 'src/composables/dynamic.ts',
    },
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
