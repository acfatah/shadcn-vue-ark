import { html } from 'common-tags'

// TODO: add types or schema to metadata
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

  files: [
    {
      path: './components/DropdownAction.vue',
      type: 'registry:page',
      target: 'src/pages/data-table-01/components/DropdownAction.vue',
    },
    {
      path: './data/users.ts',
      type: 'registry:file',
      target: 'src/pages/data-table-01/data/users.ts',
    },
  ],
}
