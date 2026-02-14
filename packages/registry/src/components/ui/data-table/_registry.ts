import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'data-table',
  title: 'Data Table',

  description: html`
    Powerful table and datagrids built using TanStack Table.

    References:
    - TanStack Table: https://tanstack.com/table/latest/docs/framework/vue/vue-table
    - shadcn/ui: https://ui.shadcn.com/docs/components/data-table
  `,

  dependencies: [
    '@tanstack/vue-table',
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
