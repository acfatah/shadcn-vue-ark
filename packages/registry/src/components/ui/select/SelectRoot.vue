<script setup lang="ts">
import type {
  CollectionItem,
  SelectRootEmits,
  SelectRootProps,
} from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import SelectContextProvider from './SelectContextProvider.vue'

export interface Props extends SelectRootProps<CollectionItem> {
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<SelectRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'collection',
  'disabled',
  'invalid',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => (props.loading || props.disabled) || undefined)
const nativeInvalid = ref(false)

function setNativeInvalid(value: boolean = true) {
  nativeInvalid.value = value
}
</script>

<template>
  <Select.Root
    v-bind="forwardedProps"
    :collection="props.collection"
    :disabled="disabled"
    :invalid="props.invalid || nativeInvalid"
    :class="cn(
      `
        group/select-control flex w-full flex-col gap-3
        *:w-full
        [&>.sr-only]:w-auto
      `,
      props.class,
    )"
  >
    <SelectContextProvider
      :invalid="props.invalid"
      :loading="props.loading"
      :native-invalid="nativeInvalid"
      :set-native-invalid="setNativeInvalid"
    >
      <slot />
    </SelectContextProvider>
  </Select.Root>
</template>
