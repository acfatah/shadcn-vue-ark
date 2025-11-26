import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export default {
  type: 'registry:ui',
  name: 'spinner',
  title: 'Spinner',

  description: html`
    Displays a button or a component that looks like a button.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/button
  `,

  dependencies: [
    '@iconify/vue',
  ],

  registryDependencies: [
    'utils',
  ],

  files: [
    {
      path: '../../composables/dynamic.ts',
      type: 'registry:file',
      target: 'src/composables/dynamic.ts',
    },
    {
      path: '../../composables/use-forward-props.ts',
      type: 'registry:file',
      target: 'src/composables/use-forward-props.ts',
    },
  ],
} satisfies RegistryItem
