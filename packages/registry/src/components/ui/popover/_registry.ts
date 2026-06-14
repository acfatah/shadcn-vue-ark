import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'popover',
  title: 'Popover',

  description: html`
    Displays rich content in a portal, triggered by a button.

    References:
    - Headless API: https://ark-ui.com/docs/components/popover
    - shadcn/ui: https://ui.shadcn.com/docs/components/popover
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
