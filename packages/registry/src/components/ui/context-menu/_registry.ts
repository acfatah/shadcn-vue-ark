import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'context-menu',
  title: 'Context Menu',

  description: html`
    Displays a menu of actions triggered by a right click.

    References:
    - Headless API: https://ark-ui.com/docs/components/menu
    - shadcn/ui: https://ui.shadcn.com/docs/components/context-menu
    - Iconify: https://iconify.design/docs/icon-components
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/composables/useForwardProps.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardProps.ts',
    },
    {
      path: 'src/composables/useForwardPropsEmits.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardPropsEmits.ts',
    },
    {
      path: 'src/composables/useForwardExpose.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardExpose.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
