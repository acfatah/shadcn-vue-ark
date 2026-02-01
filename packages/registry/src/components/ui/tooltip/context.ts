import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/create-context'

export interface TooltipOptions {
  hideArrow?: boolean
}

export const [TooltipOptionsProvider, useTooltipOptions]
  = createContext<ComputedRef<TooltipOptions>>('TooltipOptions')
