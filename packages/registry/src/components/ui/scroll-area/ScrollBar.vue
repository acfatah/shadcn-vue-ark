<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from '@ark-ui/vue/scroll-area'
import type { HTMLAttributes } from 'vue'

import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends ScrollAreaScrollbarProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ScrollArea.Scrollbar
    v-bind="forwardedProps"
    :class="cn(
      'flex touch-none p-px transition-colors select-none',
      props.orientation === 'vertical'
        && 'h-full w-2.5 border-l border-l-transparent',
      props.orientation === 'horizontal'
        && 'h-2.5 flex-col border-t border-t-transparent',
      props.class,
    )"
  >
    <ScrollArea.Thumb
      class="relative flex-1 rounded-full bg-border"
    />
  </ScrollArea.Scrollbar>
</template>
