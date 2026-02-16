import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'sidebar',
  title: 'Sidebar',

  description: html`
    A composable, themeable and customizable sidebar component.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/sidebar
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/composables/useForwardPropsEmits.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardPropsEmits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
