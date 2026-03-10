import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'navigation-menu',
  title: 'Navigation Menu',

  description: html`
    A collection of links for navigating websites.

    References:
    - Headless API: https://ark-ui.com/docs/components/navigation-menu
    - shadcn/ui: https://ui.shadcn.com/docs/components/navigation-menu
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'class-variance-authority',
    'lucide-vue-next',
    'tw-animate-css',
  ],

  files: [
    {
      path: 'src/composables/createContext.ts',
      type: 'registry:file',
      target: 'src/composables/createContext.ts',
    },
    {
      path: 'src/composables/useForwardPropsEmits.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardPropsEmits.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
