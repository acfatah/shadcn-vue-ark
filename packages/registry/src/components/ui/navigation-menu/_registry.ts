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
} satisfies RegistryItem

export default registryItem
