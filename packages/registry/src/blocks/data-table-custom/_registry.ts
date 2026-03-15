import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:block',
  name: 'data-table-custom-block',
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
      type: 'registry:file',
      target: 'src/blocks/data-table-custom/CustomFilterAndPagination.vue',
    },
    {
      path: 'DefaultDataTableDropDown.vue',
      type: 'registry:file',
      target: 'src/blocks/data-table-custom/DefaultDataTableDropDown.vue',
    },
    {
      path: 'payment-columns.ts',
      type: 'registry:file',
      target: 'src/blocks/data-table-custom/payment-columns.ts',
    },
    {
      path: 'data/payments.ts',
      type: 'registry:file',
      target: 'src/blocks/data-table-custom/data/payments.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
