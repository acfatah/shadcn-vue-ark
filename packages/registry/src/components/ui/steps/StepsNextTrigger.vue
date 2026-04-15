<script setup lang="ts">
import type { StepsNextTriggerProps } from '@ark-ui/vue/steps'
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsNextTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.NextTrigger
    data-scope="steps"
    data-part="next-trigger"
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot />
  </Steps.NextTrigger>
</template>
