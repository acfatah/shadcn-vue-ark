import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'time-picker',
  title: 'TimePicker',

  description: html`
    A popover time picker with accessible hour, minute, and optional AM/PM
    listbox columns. Supports 12-hour and 24-hour display while always emitting
    a 24-hour HH:MM value.
  `,

  registryDependencies: [
    'button',
    'popover',
  ],
} satisfies RegistryItem

export default registryItem
