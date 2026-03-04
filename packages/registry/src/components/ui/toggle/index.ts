import type { VariantProps } from 'class-variance-authority'

import type { toggleVariants } from './variant'

export { default as Toggle } from './Toggle.vue'
export type ToggleVariants = VariantProps<typeof toggleVariants>
export { size, toggleVariants, variant } from './variant'
