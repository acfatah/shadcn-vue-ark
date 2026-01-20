import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'alert',
  title: 'Alert',

  description: html`
    Displays a callout for user attention.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/alert
  `,

  dependencies: [
    '@ark-ui/vue',
    'lucide-vue-next',
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
