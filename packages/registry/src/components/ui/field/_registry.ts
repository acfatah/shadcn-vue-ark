import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'field',
  title: 'Field',

  description: html`
    Combine labels, controls, and help text to compose accessible form fields
    and grouped inputs.

    Architecture:
    - Use \`Field.*\` for form semantics and accessibility wiring.
    - Use \`Field.Label\`, \`Field.Description\`, \`Field.Error\`, and
      \`Field.RequiredIndicator\` for metadata and validation messaging.
    - Use \`Field.Input\` and \`Field.Textarea\` as context-aware wrappers,
      or compose standalone controls from \`Input.*\` inside \`Field.Root\`.

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
