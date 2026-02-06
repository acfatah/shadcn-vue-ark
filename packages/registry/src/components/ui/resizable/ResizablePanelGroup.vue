<script setup lang="ts">
import type { SplitterRootEmits, SplitterRootProps } from '@ark-ui/vue/splitter'
import type { HTMLAttributes } from 'vue'

import { Splitter } from '@ark-ui/vue/splitter'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SplitterRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<SplitterRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Splitter.Root
    v-slot="slotProps"
    data-scope="resizable"
    data-part="panel-group"
    v-bind="forwardedProps"
    :panels="props.panels"
    :class="cn(
      `
        flex size-full
        data-[orientation=vertical]:flex-col
      `,
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </Splitter.Root>
</template>
