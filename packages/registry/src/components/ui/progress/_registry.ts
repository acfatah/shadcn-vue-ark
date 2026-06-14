import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'progress',
  title: 'Progress',

  description: html`
    Displays an indicator showing the completion progress of a task, typically
    displayed as a progress bar.

    References:
    - Headless API: https://ark-ui.com/docs/components/progress
    - shadcn/ui: https://ui.shadcn.com/docs/components/progress
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
