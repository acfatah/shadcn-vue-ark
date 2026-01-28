import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'table',
  title: 'Table',

  description: html`
    A responsive table component.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/table
  `,

  dependencies: [
    '@tanstack/vue-table',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
