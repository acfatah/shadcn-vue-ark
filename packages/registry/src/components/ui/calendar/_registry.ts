import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'calendar',
  title: 'Calendar',

  description: html`
    A date field component that allows users to enter and edit date.

    References:
    - Headless API: https://ark-ui.com/docs/components/date-picker
    - shadcn/ui: https://ui.shadcn.com/docs/components/calendar
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
