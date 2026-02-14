import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:block',
  name: 'data-table-custom',
  title: 'Data Table Custom',

  description: html`
    Data table block with custom filter and pagination slots
    for richer table controls.

    References:
    - TanStack Table: https://tanstack.com/table/latest/docs/framework/vue/vue-table
    - shadcn/ui: https://ui.shadcn.com/docs/components/data-table
  `,

  dependencies: [
    '@tanstack/vue-table',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'CustomFilterAndPagination.vue',
      type: 'registry:block',
    },
    {
      path: 'DefaultDataTableDropDown.vue',
      type: 'registry:block',
    },
    {
      path: 'payment-columns.ts',
      type: 'registry:block',
    },
    {
      path: 'data/payments.ts',
      type: 'registry:block',
    },
  ],
} satisfies RegistryItem

export default registryItem
