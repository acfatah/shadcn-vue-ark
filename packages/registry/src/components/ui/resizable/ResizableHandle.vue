<script setup lang="ts">
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter'
import type { HTMLAttributes } from 'vue'

import { Splitter } from '@ark-ui/vue/splitter'
import { reactiveOmit } from '@vueuse/core'
import { GripVertical } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SplitterResizeTriggerProps {
  class?: HTMLAttributes['class']
  withHandle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  withHandle: false,
})
const delegatedProps = reactiveOmit(props, 'class', 'withHandle')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Splitter.ResizeTrigger
    :id="props.id"
    data-scope="resizable"
    data-part="handle"
    v-bind="forwardedProps"
    :class="cn(
      `
        relative flex w-px items-center justify-center bg-border
        after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2
        focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1
        focus-visible:outline-hidden
        data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full
        data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1
        data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0
        data-[orientation=vertical]:after:-translate-y-1/2
        [&[data-orientation=vertical]>*]:rotate-90
      `,
      props.class,
    )"
  >
    <template v-if="props.withHandle">
      <Splitter.ResizeTriggerIndicator
        class="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border"
      >
        <slot>
          <GripVertical class="size-2.5" />
        </slot>
      </Splitter.ResizeTriggerIndicator>
    </template>
  </Splitter.ResizeTrigger>
</template>
