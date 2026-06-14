import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'select',
  title: 'Select',

  description: html`
    Displays a list of options for the user to pick from.

    References:
    - Headless API: https://ark-ui.com/docs/components/select
    - shadcn/ui: https://ui.shadcn.com/docs/components/select
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
