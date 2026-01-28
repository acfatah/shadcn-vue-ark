<script setup lang="ts">
import type { PopoverTriggerProps } from '@ark-ui/vue/popover'
import type { HTMLAttributes } from 'vue'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends PopoverTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Popover.Trigger
    v-bind="forwardedProps"
    data-scope="popover"
    data-part="trigger"
    :class="props.class"
  >
    <slot />
  </Popover.Trigger>
</template>
