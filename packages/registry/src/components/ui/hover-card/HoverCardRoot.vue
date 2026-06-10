<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { HoverCardRootEmits, HoverCardRootProps } from './types'

interface Props extends HoverCardRootProps {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<HoverCardRootProps['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})
const emit = defineEmits<HoverCardRootEmits>()
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
  <HoverCard.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </HoverCard.Root>
</template>
