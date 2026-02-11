import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'carousel',
  title: 'Carousel',

  description: html`
    A carousel with motion and swipe built using Embla.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/carousel
    - Embla Carousel: https://www.embla-carousel.com
  `,

  dependencies: [
    '@vueuse/core',
    'embla-carousel-vue',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
