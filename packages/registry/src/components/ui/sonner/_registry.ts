import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'sonner',
  title: 'Sonner',

  description: html`
    An opinionated toast notification component powered by <code>vue-sonner</code>.

    <h2>References</h2>
    - vue-sonner: https://github.com/xiaoluoboding/vue-sonner
    - shadcn/ui: https://ui.shadcn.com/docs/components/sonner
  `,

  dependencies: [
    '@vueuse/core',
    'class-variance-authority',
    'lucide-vue-next',
    'vue-sonner',
  ],
} satisfies RegistryItem

export default registryItem
