import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'breadcrumb',
  title: 'Breadcrumb',

  description: html`
    Display the hierarchy of links to the current page.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/breadcrumb
  `,

  dependencies: [
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
