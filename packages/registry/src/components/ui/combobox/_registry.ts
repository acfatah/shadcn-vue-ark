import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'combobox',
  title: 'Combobox',

  description: html`
    Autocomplete input with a list of suggestions.

    References:
    - Headless API: https://ark-ui.com/docs/components/combobox
    - shadcn/ui: https://ui.shadcn.com/docs/components/combobox
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
