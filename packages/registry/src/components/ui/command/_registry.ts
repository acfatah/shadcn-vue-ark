import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'command',
  title: 'Command',

  description: html`
    Command menu for search and quick actions.

    References:
    - Headless API: https://ark-ui.com/docs/components/listbox
    - shadcn/ui: https://ui.shadcn.com/docs/components/command
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'reka-ui',
  ],

  files: [
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
