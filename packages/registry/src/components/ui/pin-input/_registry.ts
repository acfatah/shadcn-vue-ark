import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'pin-input',
  title: 'Pin Input',

  description: html`
    Accessible one-time password component with copy paste functionality.

    References:
    - Headless API: https://ark-ui.com/docs/components/pin-input
    - shadcn/ui: https://ui.shadcn.com/docs/components/input-otp
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
  ],
} satisfies RegistryItem

export default registryItem
