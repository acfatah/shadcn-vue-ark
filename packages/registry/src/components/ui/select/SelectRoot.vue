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
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<SelectRootProps<CollectionItem>['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})
const emit = defineEmits<SelectRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, [
  'align',
  'alignOffset',
  'class',
  'collection',
  'disabled',
  'invalid',
  'positioning',
  'side',
  'sideOffset',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const positioning = computed(() => {
  const placement = (props.align === 'center'
    ? props.side
    : `${props.side}-${props.align}`) as Placement

  return {
    ...props.positioning,
    gutter: props.positioning?.gutter ?? props.sideOffset,
    offset: props.positioning?.offset ?? (props.alignOffset
      ? { crossAxis: props.alignOffset }
      : undefined),
    placement: props.positioning?.placement ?? placement,
  }
})

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
    :positioning="positioning"
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
