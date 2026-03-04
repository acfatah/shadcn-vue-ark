<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import { TooltipOptionsProvider } from './context'

interface Props extends TooltipRootProps {
  hideArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideArrow: false,
})
const emit = defineEmits<TooltipRootEmits>()
const delegatedProps = reactiveOmit(props, ['hideArrow'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const options = computed(() => ({
  hideArrow: props.hideArrow,
}))

TooltipOptionsProvider(options)
</script>

<template>
  <Tooltip.Root v-bind="forwardedProps">
    <slot />
  </Tooltip.Root>
</template>
