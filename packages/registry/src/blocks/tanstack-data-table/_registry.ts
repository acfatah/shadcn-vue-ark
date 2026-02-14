import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:block',
  name: 'tanstack-data-table',
  title: 'TanStack Data Table',

  description: html`
    Advanced data table block using TanStack Vue Table directly,
    including expandable rows and custom column controls.

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
      path: 'TanStackTable.vue',
      type: 'registry:block',
    },
    {
      path: 'TanStackTableDropdown.vue',
      type: 'registry:block',
    },
    {
      path: 'data/payments.ts',
      type: 'registry:block',
    },
  ],
} satisfies RegistryItem

export default registryItem
