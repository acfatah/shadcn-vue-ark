import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'separator',
  title: 'Separator',

  description: html`
    Visually or semantically separates content.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/separator
  `,

  dependencies: [
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
