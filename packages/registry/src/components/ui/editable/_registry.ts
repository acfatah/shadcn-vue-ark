import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'editable',
  title: 'Editable',

  description: html`
    An inline editable text field that allows users to edit text in place.

    References:
    - Headless API: https://ark-ui.com/docs/components/editable
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],
} satisfies RegistryItem

export default registryItem
