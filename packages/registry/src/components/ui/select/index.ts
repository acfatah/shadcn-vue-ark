import type { CollectionItem } from '@ark-ui/vue/select'

import {
  Select as ArkSelect,
  useSelect as useArkSelect,
  useSelectContext as useArkSelectContext,
} from '@ark-ui/vue/select'
import { computed, ref } from 'vue'

import type {
  ExtendedSelectApi,
  UseSelectProps,
  UseSelectReturn,
} from './context'

import { SelectProvider } from './context'

export { SelectProvider, useSelectContext } from './context'
export { useArkSelectContext }
export const SelectControl = ArkSelect.Control
export type { UseSelectContext, UseSelectProps, UseSelectReturn } from './context'
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
export { createListCollection } from '@ark-ui/vue/select'

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
