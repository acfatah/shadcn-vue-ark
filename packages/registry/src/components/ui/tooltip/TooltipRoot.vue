<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { HTMLAttributes } from 'vue'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends TooltipRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<TooltipRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Tooltip.Root
    v-bind="forwardedProps"
    data-scope="tooltip"
    data-part="root"
    :class="props.class"
  >
    <slot />
  </Tooltip.Root>
</template>
