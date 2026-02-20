import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'input',
  title: 'Input',

  description: html`
    Accessible input controls for capturing user-entered values in forms and
    interactive UIs.

    Architecture:
    - Use \`Input.*\` as standalone control primitives.
    - For form semantics such as labels, descriptions, errors, and required
      indicators, pair controls with \`Field.*\`.
    - In grouped forms, combine \`Field.*\` with \`Fieldset.*\`.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/input
    - shadcn/ui Field: https://ui.shadcn.com/docs/components/field
  `,

  dependencies: [
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
      path: 'src/composables/useForwardProps.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardProps.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
