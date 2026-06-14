import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'date-picker',
  title: 'DatePicker',

  description: html`
    A date picker component that combines a popover trigger with an inline
    calendar for date selection.

    References:
    - Headless API: https://ark-ui.com/docs/components/date-picker
    - shadcn/ui: https://ui.shadcn.com/docs/components/date-picker
  `,

  dependencies: [
    '@ark-ui/vue',
    '@iconify/vue',
    '@internationalized/date',
    '@vueuse/core',
  ],

  registryDependencies: [
    'button',
    'calendar',
    'popover',
  ],
} satisfies RegistryItem

export default registryItem
