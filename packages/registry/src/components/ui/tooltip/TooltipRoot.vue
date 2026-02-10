<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { HTMLAttributes } from 'vue'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import { TooltipOptionsProvider } from './context'

interface Props extends TooltipRootProps {
  class?: HTMLAttributes['class']
  hideArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideArrow: false,
})
const emit = defineEmits<TooltipRootEmits>()
const delegatedProps = reactiveOmit(props, ['class', 'hideArrow'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const options = computed(() => ({
  hideArrow: props.hideArrow,
}))

TooltipOptionsProvider(options)
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
