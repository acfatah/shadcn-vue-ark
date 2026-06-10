<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { StepsTriggerProps } from './types'

interface Props extends StepsTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.Trigger
    data-scope="steps"
    data-part="trigger"
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex flex-col items-center gap-2 bg-transparent text-sm font-medium outline-none
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Steps.Trigger>
</template>
