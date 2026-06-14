import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'slider',
  title: 'Slider',

  description: html`
    An input where the user selects a value from within a given range.

    References:
    - Headless API: https://ark-ui.com/docs/components/slider
    - shadcn/ui: https://ui.shadcn.com/docs/components/slider
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
