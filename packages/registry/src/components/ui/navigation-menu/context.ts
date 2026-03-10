import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/createContext'

export interface NavigationMenuOptions {
  viewport?: boolean
}

export const [NavigationMenuOptionsProvider, useNavigationMenuOptions]
  = createContext<ComputedRef<NavigationMenuOptions>>('NavigationMenuOptions')
