import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

import type { buttonGroupVariants } from './variant'

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>

export interface ButtonGroupRootProps {
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}
