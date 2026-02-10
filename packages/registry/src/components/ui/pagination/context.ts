import type { ComputedRef } from 'vue'

import type { ButtonVariants } from '@/components/ui/button'

import { createContext } from '@/composables/createContext'

export interface PaginationOptions {
  itemSize?: ButtonVariants['size']
  controlSize?: ButtonVariants['size']
}

export const [PaginationOptionsProvider, usePaginationOptions]
  = createContext<ComputedRef<PaginationOptions>>('PaginationOptions')
