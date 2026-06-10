import type { VariantProps } from 'class-variance-authority'

import type { alertVariants } from './variant'

export type AlertVariants = VariantProps<typeof alertVariants>

// ── Polymorphic part props ───────────────────────────────────────────────────
// `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

export interface AlertRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface AlertTitleProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface AlertDescriptionProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
