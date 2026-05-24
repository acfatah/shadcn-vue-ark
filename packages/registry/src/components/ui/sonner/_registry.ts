import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'sonner',
  title: 'Sonner',

  description: html`
    An opinionated toast notification component powered by <code>vue-sonner</code>.

    <h2>Manual CSS Import</h2>

    This component requires an additional CSS import for toast variant styles
    (success, info, warning, error). Add the following to your main CSS file
    (e.g. <code>app.css</code> or <code>global.css</code>):

    <code>@import "../components/ui/sonner/styles.css";</code>

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

  files: [
    {
      path: 'src/lib/utils.ts',
      type: 'registry:file',
      target: 'src/lib/utils.ts',
    },
    {
      path: 'src/components/ui/sonner/styles.css',
      type: 'registry:file',
      target: 'src/components/ui/sonner/styles.css',
    },
  ],

  css: {
    '@import: "../components/ui/sonner/styles.css"': {},
  },
} satisfies RegistryItem

export default registryItem
