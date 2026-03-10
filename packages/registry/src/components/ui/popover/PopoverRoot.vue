<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends PopoverRootProps {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type Placement = NonNullable<
  NonNullable<PopoverRootProps['positioning']>['placement']
>

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'bottom',
})
const emit = defineEmits<PopoverRootEmits>()
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
  <Popover.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </Popover.Root>
</template>
