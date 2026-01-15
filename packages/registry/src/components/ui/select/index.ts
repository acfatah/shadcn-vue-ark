import type {
  CollectionItem,
  UseSelectProps as UseArkSelectProps,
  UseSelectReturn as UseArkSelectReturn,
} from '@ark-ui/vue/select'
import type { ComputedRef } from 'vue'
import {
  Select as ArkSelect,
  useSelect as useArkSelect,
  useSelectContext as useArkSelectContext,
} from '@ark-ui/vue/select'
import { computed, ref } from 'vue'
import { createContext } from '@/composables/create-context'

export { createListCollection } from '@ark-ui/vue/select'
export { useArkSelectContext }
export const SelectControl = ArkSelect.Control

export { Select } from './namespace'

export { default as SelectClearTrigger } from './SelectClearTrigger.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectEmpty } from './SelectEmpty.vue'
export { default as SelectIndicator } from './SelectIndicator.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as SelectItemGroup } from './SelectItemGroup.vue'
export { default as SelectItemGroupLabel } from './SelectItemGroupLabel.vue'
export { default as SelectItemIndicator } from './SelectItemIndicator.vue'
export { default as SelectItemText } from './SelectItemText.vue'
export { default as SelectLabel } from './SelectLabel.vue'
export { default as SelectRoot } from './SelectRoot.vue'
export { default as SelectSeparator } from './SelectSeparator.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectValueText } from './SelectValueText.vue'

interface UseSelectProps<T extends CollectionItem>
  extends UseArkSelectProps<T> {
  loading?: boolean
}

type ArkSelectApi<T extends CollectionItem>
  = UseArkSelectReturn<T> extends ComputedRef<infer R> ? R : never

type ExtendedSelectApi<T extends CollectionItem> = ArkSelectApi<T> & {
  loading: boolean
  disabled: boolean
  /** Reflects the invalid state reported by the native select element. */
  nativeInvalid: boolean
  setNativeInvalid: (value?: boolean) => void
}

type UseSelectReturn<T extends CollectionItem> = ComputedRef<ExtendedSelectApi<T>>

export interface UseSelectContext<T extends CollectionItem>
  extends UseSelectReturn<T> {}
export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<CollectionItem>>('SelectContext')

// Note: use for standalone composition or RootProvider usage.
export function useSelect<T extends CollectionItem>(
  props?: UseSelectProps<T>,
): UseSelectReturn<T> {
  const api = useArkSelect<T>(props ?? ({} as UseSelectProps<T>))
  const loading = ref(false)
  const nativeInvalid = ref(false)
  const disabled = computed(() => api.value.disabled || loading.value)

  function setNativeInvalid(value: boolean = true) {
    nativeInvalid.value = value
  }

  const extended = computed<ExtendedSelectApi<T>>(() => ({
    ...api.value,
    ...(props ?? {}),
    loading: loading.value,
    disabled: disabled.value,
    invalid: props?.invalid || nativeInvalid.value,
    nativeInvalid: nativeInvalid.value,
    setNativeInvalid,
  }))

  SelectProvider(extended)

  return extended
}
