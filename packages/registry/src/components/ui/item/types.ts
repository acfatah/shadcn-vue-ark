// `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { VariantProps } from 'class-variance-authority'

import type { itemMediaVariants, itemVariants } from './variant'

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>
export type ItemVariants = VariantProps<typeof itemVariants>

export interface ItemRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
