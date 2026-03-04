import type { VariantProps } from 'class-variance-authority'

import type { tabsListVariants, tabsTriggerVariants } from './variant'

export type TabsListVariants = VariantProps<typeof tabsListVariants>
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
export type TabsVariant = NonNullable<TabsListVariants['variant']>

export { Tabs } from './namespace'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsIndicator } from './TabsIndicator.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsRoot } from './TabsRoot.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
export { listVariant, tabsListVariants, tabsTriggerVariants, triggerVariant } from './variant'
