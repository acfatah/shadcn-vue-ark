import type { VariantProps } from 'class-variance-authority'

import type { tabsListVariants, tabsTriggerVariants } from './variant'

export type TabsListVariants = VariantProps<typeof tabsListVariants>
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
export type TabsVariant = NonNullable<TabsListVariants['variant']>
