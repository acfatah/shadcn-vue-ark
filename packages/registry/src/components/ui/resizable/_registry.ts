import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'resizable',
  title: 'Resizable',

  description: html`
    Accessible resizable panel groups and layouts with keyboard support.

    References:
    - Headless API: https://ark-ui.com/docs/components/splitter
    - shadcn/ui: https://ui.shadcn.com/docs/components/resizable
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/composables/useForwardExpose.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardExpose.ts',
    },
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
