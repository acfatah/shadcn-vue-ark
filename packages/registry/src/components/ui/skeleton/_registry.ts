import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:ui',
  name: 'skeleton',
  title: 'Skeleton',

  description: html`
    Use to show a placeholder while content is loading.

    References:
    - shadcn-ui: https://ui.shadcn.com/docs/components/skeleton
  `,

  dependencies: [],
} satisfies RegistryItem

export default registryItem
