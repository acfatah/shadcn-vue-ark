import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'timeline',
  title: 'Timeline',

  description: html`
    Displays a list of events in chronological order.
    Supports vertical and horizontal orientations with size variants.
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
    {
      path: 'src/composables/createContext.ts',
      type: 'registry:file',
      target: 'src/composables/createContext.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
