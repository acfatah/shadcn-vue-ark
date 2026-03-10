<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu'
import type { HTMLAttributes } from 'vue'

import { Menu } from '@ark-ui/vue/menu'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends MenuRootProps {
  class?: HTMLAttributes['class']
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

type Placement = NonNullable<
  NonNullable<MenuRootProps['positioning']>['placement']
>

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 4,
})

const emit = defineEmits<MenuRootEmits>()
const delegatedProps = reactiveOmit(props, [
  'class',
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
  <Menu.Root
    v-bind="forwardedProps"
    :positioning="positioning"
  >
    <slot />
  </Menu.Root>
</template>
