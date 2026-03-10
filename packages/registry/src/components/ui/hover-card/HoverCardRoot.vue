<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from '@ark-ui/vue/hover-card'

import { HoverCard } from '@ark-ui/vue/hover-card'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends HoverCardRootProps {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type Placement = NonNullable<
  NonNullable<HoverCardRootProps['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'bottom',
})
const emit = defineEmits<HoverCardRootEmits>()
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
  <HoverCard.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </HoverCard.Root>
</template>
