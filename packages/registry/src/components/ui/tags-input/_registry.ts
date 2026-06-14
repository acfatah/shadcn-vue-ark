import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'tags-input',
  title: 'Tags Input',

  description: html`
    Tag inputs render tags inside an input, followed by an actual text input.

    References:
    - Headless API: https://ark-ui.com/docs/components/tags-input
    - shadcn/ui: https://shadcn-vue.com/docs/components/tags-input
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
