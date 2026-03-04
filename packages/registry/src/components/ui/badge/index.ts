import type { VariantProps } from 'class-variance-authority'

import type { badgeVariants } from './variant'

export { default as Badge } from './Badge.vue'
export type BadgeVariants = VariantProps<typeof badgeVariants>
export { badgeVariants, variant } from './variant'
