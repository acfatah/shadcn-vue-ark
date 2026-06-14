import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'sheet',
  title: 'Sheet',

  description: html`
    Extends the Dialog component to display content that complements the main
    content of the screen.

    References:
    - Headless API: https://ark-ui.com/docs/components/dialog
    - shadcn/ui: https://ui.shadcn.com/docs/components/sheet
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
