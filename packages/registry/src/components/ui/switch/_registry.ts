import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'switch',
  title: 'Switch',

  description: html`
    A control that allows the user to toggle between checked and not checked.

    References:
    - Headless API: https://ark-ui.com/docs/components/switch
    - shadcn/ui: https://ui.shadcn.com/docs/components/switch
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],

  files: [
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
