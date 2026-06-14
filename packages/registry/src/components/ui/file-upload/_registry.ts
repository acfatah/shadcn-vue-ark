import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'file-upload',
  title: 'File Upload',

  description: html`
    A component for uploading files with drag and drop support.

    References:
    - Headless API: https://ark-ui.com/docs/components/file-upload
  `,

  dependencies: [
    '@ark-ui/vue',
    '@vueuse/core',
    'lucide-vue-next',
    'tw-animate-css',
  ],
} satisfies RegistryItem

export default registryItem
