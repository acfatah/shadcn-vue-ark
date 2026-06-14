import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'badge',
  title: 'Badge',

  description: html`
    Displays a badge or a component that looks like a badge.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/badge
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
  ],
} satisfies RegistryItem

export default registryItem
