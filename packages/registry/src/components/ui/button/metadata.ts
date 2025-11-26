import { html } from 'common-tags'
import type { RegistryItem } from '../../../shadcn/schema'

export default {
  type: 'registry:ui',
  name: 'spinner',
  title: 'Spinner',

  description: html`
    Displays a button or a component that looks like a button.
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
  ],
} satisfies RegistryItem
