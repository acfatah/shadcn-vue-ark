import type { RegistryItem } from 'shadcn/schema'
import { html } from 'common-tags'

export const metadata = {
  type: 'registry:ui',
  name: 'spinner',
  title: 'Spinner',

  description: html`
    An indicator that can be used to show a loading state.

    References:
    - Iconify: https://iconify.design/docs/icon-components
    - shadcn/ui: https://ui.shadcn.com/docs/components/spinner
  `,

  dependencies: [
    '@iconify/vue',
  ],
} satisfies RegistryItem

export default metadata
