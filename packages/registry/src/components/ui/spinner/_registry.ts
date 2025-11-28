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
    - Iconify: https://iconify.design/docs/icon-components
  `,

  dependencies: [
    '@iconify/vue',
    '@vueuse/core',
  ],

  files: [
    {
      path: 'src/composables/dynamic.ts',
      type: 'registry:file',
      target: 'src/composables/dynamic.ts',
    },
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
