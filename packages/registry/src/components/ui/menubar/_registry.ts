import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'menubar',
  title: 'Menubar',

  description: html`
    A visually persistent menu common in desktop applications that provides quick
    access to a consistent set of commands.

    References:
    - Headless API: https://ark-ui.com/docs/components/menu
    - shadcn/ui: https://ui.shadcn.com/docs/components/menubar
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
