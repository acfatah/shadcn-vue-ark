import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'drawer',
  title: 'Drawer',

  description: html`
    A drawer component for mobile devices.

    References:
    - Headless API: https://ark-ui.com/docs/components/dialog
    - shadcn/ui: https://ui.shadcn.com/docs/components/drawer
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
