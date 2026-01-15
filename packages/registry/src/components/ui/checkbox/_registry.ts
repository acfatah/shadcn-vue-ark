import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'checkbox',
  title: 'Checkbox',

  description: html`
    A control that allows the user to toggle between checked and not checked.

    References:
    - Headless API: https://ark-ui.com/docs/components/checkbox
    - shadcn/ui: https://ui.shadcn.com/docs/components/checkbox
    - Iconify: https://iconify.design/docs/icon-components
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'src/composables/dynamic.ts',
      type: 'registry:file',
      target: 'src/composables/dynamic.ts',
    },
    {
      path: 'src/composables/use-forward-props-emits.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props-emits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
