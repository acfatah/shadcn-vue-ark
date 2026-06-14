import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'pagination',
  title: 'Pagination',

  description: html`
    Pagination with page navigation, next and previous links.

    References:
    - Headless API: https://ark-ui.com/docs/components/pagination
    - shadcn/ui: https://ui.shadcn.com/docs/components/pagination
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
