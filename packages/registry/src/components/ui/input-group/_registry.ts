import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'input-group',
  title: 'Input Group',

  description: html`
    Display additional information or actions to an input or textarea.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/input-group
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
  ],

  files: [
    {
      path: 'src/composables/use-forward-props-emits.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props-emits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
