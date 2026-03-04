import type { VariantProps } from 'class-variance-authority'

import type { alertVariants } from './variant'

export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertRoot } from './AlertRoot.vue'
export { default as AlertTitle } from './AlertTitle.vue'
export { Alert } from './namespace'
export type AlertVariants = VariantProps<typeof alertVariants>
export { alertVariants, variant } from './variant'
