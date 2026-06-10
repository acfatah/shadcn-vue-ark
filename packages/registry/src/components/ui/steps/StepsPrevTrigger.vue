<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { StepsPrevTriggerProps } from './types'

interface Props extends StepsPrevTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.PrevTrigger
    data-scope="steps"
    data-part="prev-trigger"
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot />
  </Steps.PrevTrigger>
</template>
