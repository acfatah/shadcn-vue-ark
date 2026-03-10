<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import { TooltipOptionsProvider } from './context'

interface Props extends TooltipRootProps {
  align?: 'start' | 'center' | 'end'
  hideArrow?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type Placement = NonNullable<
  NonNullable<TooltipRootProps['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  hideArrow: false,
  side: 'bottom',
})
const emit = defineEmits<TooltipRootEmits>()
const delegatedProps = reactiveOmit(props, [
  'align',
  'hideArrow',
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
