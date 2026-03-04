import type { VariantProps } from 'class-variance-authority'

import type { buttonGroupVariants } from './variant'

export { default as ButtonGroupRoot } from './ButtonGroupRoot.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { default as ButtonGroupText } from './ButtonGroupText.vue'
export { ButtonGroup } from './namespace'
export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export { buttonGroupVariants, orientation } from './variant'
