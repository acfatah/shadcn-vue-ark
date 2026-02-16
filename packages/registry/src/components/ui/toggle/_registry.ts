import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'toggle',
  title: 'Toggle',

  description: html`
    A two-state button that can be either on or off.

    References:
    - Headless API: https://ark-ui.com/docs/components/toggle
    - shadcn/ui: https://ui.shadcn.com/docs/components/toggle
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
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
