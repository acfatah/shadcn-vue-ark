import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/create-context'

import type { TabsVariant } from '.'

export interface TabsOptions {
  variant?: TabsVariant
}

export const [TabsOptionsProvider, useTabsOptions]
  = createContext<ComputedRef<TabsOptions>>('TabsOptions')
