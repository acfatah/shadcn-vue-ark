import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'radio-group',
  title: 'Radio Group',

  description: html`
    A set of checkable buttons, known as radio buttons, where no more than one
    of the buttons can be checked at a time.

    References:
    - Headless API: https://ark-ui.com/docs/components/radio-group
    - shadcn/ui: https://ui.shadcn.com/docs/components/radio-group
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
