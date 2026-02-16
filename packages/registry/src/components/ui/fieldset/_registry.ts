import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'fieldset',
  title: 'Fieldset',

  description: html`
    A set of form controls optionally grouped to compose accessible form fields
    and grouped inputs.

    References:
    - Ark UI: https://ark-ui.com/vue/docs/components/fieldset
    - shadcn/ui: https://ui.shadcn.com/docs/components/field#fieldset-1
  `,

  dependencies: [
    '@ark-ui/vue',
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
