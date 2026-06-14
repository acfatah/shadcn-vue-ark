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
} satisfies RegistryItem

export default registryItem
