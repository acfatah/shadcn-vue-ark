import type { VariantProps } from 'class-variance-authority'

import type { emptyMediaVariants } from './variant'

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>

// `asChild` inlined from @ark-ui/vue@5.37.0 `PolymorphicProps`.
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

export interface EmptyRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EmptyHeaderProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EmptyMediaProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EmptyTitleProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EmptyDescriptionProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EmptyContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
