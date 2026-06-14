import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'toggle-group',
  title: 'Toggle Group',

  description: html`
    A set of two-state buttons that can be toggled on or off.

    References:
    - Headless API: https://ark-ui.com/docs/components/toggle-group
    - shadcn/ui: https://ui.shadcn.com/docs/components/toggle-group
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
  ],
} satisfies RegistryItem

export default registryItem
