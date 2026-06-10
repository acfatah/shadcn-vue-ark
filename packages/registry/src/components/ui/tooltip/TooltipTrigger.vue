<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { TooltipTriggerProps } from './types'

interface Props extends TooltipTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tooltip.Trigger
    v-bind="forwardedProps"
    data-scope="tooltip"
    data-part="trigger"
    :class="props.class"
  >
    <slot />
  </Tooltip.Trigger>
</template>
