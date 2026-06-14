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
} satisfies RegistryItem

export default registryItem
