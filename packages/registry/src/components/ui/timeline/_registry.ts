import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'timeline',
  title: 'Timeline',

  description: html`
    Displays a list of events in chronological order.
    Supports vertical and horizontal orientations with size variants.
    The reversed prop reverses the visual layout direction;
    consumers are responsible for providing data in the desired order.
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
