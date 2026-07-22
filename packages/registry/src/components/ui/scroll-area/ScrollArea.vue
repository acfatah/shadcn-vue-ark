<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ScrollAreaRootProps } from './types'

import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import ScrollBar from './ScrollBar.vue'

interface Props extends ScrollAreaRootProps {
  class?: HTMLAttributes['class']
  hideScrollbar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideScrollbar: false,
})
const delegatedProps = reactiveOmit(props, ['class', 'hideScrollbar'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ScrollArea.Root
    v-bind="forwardedProps"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollArea.Viewport
      class="
        no-scrollbar size-full rounded-[inherit] transition-[color,box-shadow] outline-none
        focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1
      "
    >
      <slot />
    </ScrollArea.Viewport>
    <ScrollBar v-if="!props.hideScrollbar" />
    <ScrollArea.Corner />
  </ScrollArea.Root>
</template>
