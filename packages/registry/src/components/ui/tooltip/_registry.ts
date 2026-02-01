import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'tooltip',
  title: 'Tooltip',

  description: html`
    A popup that displays information related to an element when the element
    receives keyboard focus or the mouse hovers over it.

    References:
    - Headless API: https://ark-ui.com/docs/components/tooltip
    - shadcn/ui: https://ui.shadcn.com/docs/components/tooltip
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
