<script setup lang="ts">
import type {
  CollectionItem,
  ComboboxRootEmits,
  ComboboxRootProps,
} from '@ark-ui/vue/combobox'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends ComboboxRootProps<CollectionItem> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type Placement = NonNullable<
  NonNullable<ComboboxRootProps<CollectionItem>['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  side: 'bottom',
})
const emit = defineEmits<ComboboxRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, [
  'align',
  'positioning',
  'side',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const positioning = computed(() => {
  const placement = (props.align === 'center'
    ? props.side
    : `${props.side}-${props.align}`) as Placement

  return {
    ...props.positioning,
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
