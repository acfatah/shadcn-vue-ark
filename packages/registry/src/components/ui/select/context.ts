import type {
  CollectionItem,
  UseSelectProps as UseArkSelectProps,
  UseSelectReturn as UseArkSelectReturn,
} from '@ark-ui/vue/select'
import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/create-context'

export interface UseSelectProps<T extends CollectionItem>
  extends UseArkSelectProps<T> {
  loading?: boolean
}

type ArkSelectApi<T extends CollectionItem>
  = UseArkSelectReturn<T> extends ComputedRef<infer R> ? R : never

export type ExtendedSelectApi<T extends CollectionItem> = ArkSelectApi<T> & {
  loading: boolean
  disabled: boolean
  /** Reflects the invalid state reported by the native select element. */
  nativeInvalid: boolean
  setNativeInvalid: (value?: boolean) => void
}

export type UseSelectReturn<T extends CollectionItem>
  = ComputedRef<ExtendedSelectApi<T>>

export interface UseSelectContext<T extends CollectionItem>
  extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext]
  = createContext<UseSelectContext<CollectionItem>>('SelectContext')
