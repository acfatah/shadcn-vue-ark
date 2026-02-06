<script setup lang="ts">
import type { ScrollAreaRootProps } from '@ark-ui/vue/scroll-area'
import type { HTMLAttributes } from 'vue'

import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import ScrollBar from './ScrollBar.vue'

interface Props extends ScrollAreaRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
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
    <ScrollBar />
    <ScrollArea.Corner />
  </ScrollArea.Root>
</template>
