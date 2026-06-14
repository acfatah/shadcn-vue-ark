import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'label',
  title: 'Label',

  description: html`
    Renders an accessible label associated with controls.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/label
  `,

  dependencies: [
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
