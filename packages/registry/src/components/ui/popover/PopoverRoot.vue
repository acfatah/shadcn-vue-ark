<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends PopoverRootProps {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<PopoverRootProps['positioning']>['placement']
>

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})
const emit = defineEmits<PopoverRootEmits>()
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
  <Popover.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </Popover.Root>
</template>
