<script setup lang="ts">
import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type {
  CollectionItem,
  ComboboxRootEmits,
  ComboboxRootProps,
} from './types'

interface Props extends ComboboxRootProps<CollectionItem> {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<ComboboxRootProps<CollectionItem>['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})
const emit = defineEmits<ComboboxRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, [
  'align',
  'alignOffset',
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
</script>

<template>
  <Combobox.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </Combobox.Root>
</template>
