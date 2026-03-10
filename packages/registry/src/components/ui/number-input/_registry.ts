import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'number-input',
  title: 'Number Input',

  description: html`
    A numeric input component with increment and decrement controls.

    References:
    - Headless API: https://ark-ui.com/docs/components/number-input
  `,

  dependencies: [
    '@ark-ui/vue',
    '@iconify/vue',
    '@vueuse/core',
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
