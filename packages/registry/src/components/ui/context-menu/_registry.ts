import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'context-menu',
  title: 'Context Menu',

  description: html`
    Displays a menu of actions triggered by a right click.

    References:
    - Headless API: https://ark-ui.com/docs/components/menu
    - shadcn/ui: https://ui.shadcn.com/docs/components/context-menu
    - Iconify: https://iconify.design/docs/icon-components
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
