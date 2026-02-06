import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'tabs',
  title: 'Tabs',

  description: html`
    A set of layered sections of content—known as tab panels—that are displayed
    one at a time.

    References:
    - Headless API: https://ark-ui.com/docs/components/tabs
    - shadcn/ui: https://ui.shadcn.com/docs/components/tabs
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/composables/use-forward-props-emits.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props-emits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
