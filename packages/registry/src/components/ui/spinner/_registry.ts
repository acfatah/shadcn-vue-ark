import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'spinner',
  title: 'Spinner',

  description: html`
    An indicator that can be used to show a loading state.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/spinner
    - lucide-vue-next: https://lucide.dev/guide/packages/lucide-vue-next
  `,

  dependencies: [
    '@vueuse/core',
    'lucide-vue-next',
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
