import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'dropdown-menu',
  title: 'Dropdown Menu',

  description: html`
    Displays a menu to the user with actions and submenus.

    References:
    - Headless API: https://ark-ui.com/docs/components/menu
    - shadcn/ui: https://ui.shadcn.com/docs/components/dropdown-menu
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
