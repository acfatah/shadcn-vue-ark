import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'empty',
  title: 'Empty',

  description: html`
    Use the Empty component to display an empty state.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/empty
  `,

  dependencies: [
    'class-variance-authority',
  ],
} satisfies RegistryItem

export default registryItem
