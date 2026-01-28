import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'sonner',
  title: 'Sonner',

  description: html`
    Toast notifications powered by <code>vue-sonner</code>.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/sonner
    - vue-sonner: https://github.com/xiaoluoboding/vue-sonner
  `,

  dependencies: [
    'vue-sonner',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/composables/use-forward-props.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
