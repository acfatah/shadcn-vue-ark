import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'kbd',
  title: 'Kbd',

  description: html`
    Displays keyboard input shortcuts.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/kbd
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
