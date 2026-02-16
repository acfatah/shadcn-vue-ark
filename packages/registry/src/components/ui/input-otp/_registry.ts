import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'input-otp',
  title: 'Input OTP',

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

  files: [
    {
      path: 'src/composables/useForwardProps.ts',
      type: 'registry:file',
      target: 'src/composables/useForwardProps.ts',
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
