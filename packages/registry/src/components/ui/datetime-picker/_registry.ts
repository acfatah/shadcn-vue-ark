import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'datetime-picker',
  title: 'DatetimePicker',

  description: html`
    A datetime picker component that combines a calendar with
    a scrollable time picker for selecting both date and time.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/date-picker
  `,

  dependencies: [
    '@ark-ui/vue',
    '@internationalized/date',
    '@vueuse/core',
  ],

  registryDependencies: [
    'button',
    'calendar',
    'popover',
    'scroll-area',
    'separator',
  ],
} satisfies RegistryItem

export default registryItem
