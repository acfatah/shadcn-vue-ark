import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'field',
  title: 'Field',

  description: html`
    Provides a flexible container for form inputs, labels, and helper text, based
    on Ark UI field components.

    References:
    - Headless API: https://ark-ui.com/docs/components/field
    - shadcn/ui: https://ui.shadcn.com/docs/components/field
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
