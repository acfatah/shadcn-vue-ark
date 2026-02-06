<script setup lang="ts">
import type { SplitterPanelProps } from '@ark-ui/vue/splitter'
import type { HTMLAttributes } from 'vue'

import { Splitter } from '@ark-ui/vue/splitter'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SplitterPanelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Splitter.Panel
    :ref="forwardRef"
    v-slot="slotProps"
    data-slot="resizable-panel"
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot v-bind="slotProps" />
  </Splitter.Panel>
</template>
