import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'dialog',
  title: 'Dialog',

  description: html`
    A window overlaid on either the primary window or another dialog window,
    rendering the content underneath inert.

    References:
    - Headless API: https://ark-ui.com/docs/components/dialog
    - shadcn/ui: https://ui.shadcn.com/docs/components/dialog
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
