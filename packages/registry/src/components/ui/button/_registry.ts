import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'button',
  title: 'Button',

  description: html`
    Displays a button or a component that looks like a button.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/button
  `,

  dependencies: [
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
