import { html } from 'common-tags'
import type { RegistryItem } from '../../../shadcn/schema'

export default {
  type: 'registry:ui',
  name: 'accordion',
  title: 'Accordion',

  description: html`
    A vertically stacked set of interactive headings that each reveal a section of content.

    References:
    - Headless API: https://ark-ui.com/docs/components/accordion
    - shadcn/ui: https://ui.shadcn.com/docs/components/accordion
  `,

  dependencies: [
    '@ark-ui/vue',
    '@iconify/vue',
    '@vueuse/core',
  ],

  registryDependencies: [
    'utils',
  ],
} satisfies RegistryItem
