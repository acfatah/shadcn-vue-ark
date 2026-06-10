// `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { VariantProps } from 'class-variance-authority'

import type { badgeVariants } from './variant'

export type BadgeVariants = VariantProps<typeof badgeVariants>

export interface BadgeProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
