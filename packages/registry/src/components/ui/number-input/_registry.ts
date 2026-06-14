import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'number-input',
  title: 'Number Input',

  description: html`
    A numeric input component with increment and decrement controls.

    References:
    - Headless API: https://ark-ui.com/docs/components/number-input
  `,

  dependencies: [
    '@ark-ui/vue',
    '@iconify/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
