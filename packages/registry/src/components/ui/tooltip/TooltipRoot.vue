<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from './types'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import { TooltipOptionsProvider } from './context'

interface Props extends TooltipRootProps {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  hideArrow?: boolean
  positioning?: TooltipRootProps['positioning']
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<TooltipRootProps['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  hideArrow: false,
  side: 'bottom',
  sideOffset: 4,
})
const emit = defineEmits<TooltipRootEmits>()
const delegatedProps = reactiveOmit(props, [
  'align',
  'alignOffset',
  'hideArrow',
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

const options = computed(() => ({
  hideArrow: props.hideArrow,
}))

TooltipOptionsProvider(options)
</script>

<template>
  <Tooltip.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </Tooltip.Root>
</template>
