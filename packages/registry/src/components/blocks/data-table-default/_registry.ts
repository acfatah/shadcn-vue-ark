import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:block',
  name: 'data-table-default-block',
  title: 'Data Table Default',

  description: html`
    Data table block using the reusable DataTable component with
    built-in filtering, pagination, and row selection.

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
      path: 'DefaultDataTable.vue',
      type: 'registry:file',
      target: 'src/components/data-table-default/DefaultDataTable.vue',
    },
    {
      path: 'DefaultDataTableDropDown.vue',
      type: 'registry:file',
      target: 'src/components/data-table-default/DefaultDataTableDropDown.vue',
    },
    {
      path: 'payment-columns.ts',
      type: 'registry:file',
      target: 'src/components/data-table-default/payment-columns.ts',
    },
    {
      path: 'data/payments.ts',
      type: 'registry:file',
      target: 'src/components/data-table-default/data/payments.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
