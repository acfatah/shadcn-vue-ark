import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'avatar',
  title: 'Avatar',

  description: html`
    An image element with a fallback for representing the user.

    References:
    - Headless API: https://ark-ui.com/docs/components/avatar
    - shadcn/ui: https://ui.shadcn.com/docs/components/avatar
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
