import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'hover-card',
  title: 'Hover Card',

  description: html`
    For sighted users to preview content available behind a link.

    References:
    - Headless API: https://ark-ui.com/docs/components/hover-card
    - shadcn/ui: https://ui.shadcn.com/docs/components/hover-card
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
