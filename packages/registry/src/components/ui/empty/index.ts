import type { VariantProps } from 'class-variance-authority'

import type { emptyMediaVariants } from './variant'

export { default as EmptyContent } from './EmptyContent.vue'
export { default as EmptyDescription } from './EmptyDescription.vue'
export { default as EmptyHeader } from './EmptyHeader.vue'
export { default as EmptyMedia } from './EmptyMedia.vue'
export { default as EmptyRoot } from './EmptyRoot.vue'
export { default as EmptyTitle } from './EmptyTitle.vue'
export { Empty } from './namespace'
export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
export { emptyMediaVariants, variant } from './variant'
