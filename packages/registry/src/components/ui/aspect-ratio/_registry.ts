import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'aspect-ratio',
  title: 'Aspect Ratio',

  description: html`
    Displays content within a desired aspect ratio.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/aspect-ratio
  `,

  dependencies: [
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
