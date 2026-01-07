import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'card',
  title: 'Card',

  description: html`
    Displays a card with header, content, and footer.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/card
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
