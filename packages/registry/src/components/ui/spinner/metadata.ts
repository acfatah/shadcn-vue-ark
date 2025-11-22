import { html } from 'common-tags'

// TODO: add types or schema to metadata
export default {
  type: 'registry:ui',
  name: 'spinner',
  title: 'Spinner',

  description: html`
    An indicator that can be used to show a loading state.
  `,

  dependencies: [
    '@iconify/vue',
  ],

  registryDependencies: [
    'utils',
  ],
}
