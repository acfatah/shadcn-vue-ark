<script setup lang="ts">
import type { HoverCardTriggerProps } from '@ark-ui/vue/hover-card'
import type { HTMLAttributes } from 'vue'

import { HoverCard } from '@ark-ui/vue/hover-card'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends HoverCardTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <HoverCard.Trigger
    v-bind="forwardedProps"
    data-scope="hover-card"
    data-part="trigger"
    :class="props.class"
  >
    <slot />
  </HoverCard.Trigger>
</template>
