<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { StepsIndicatorProps } from './types'

interface Props extends StepsIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.Indicator
    data-scope="steps"
    data-part="indicator"
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-muted
        bg-muted text-sm font-medium text-muted-foreground transition-colors
      `,
      'data-current:border-primary data-current:text-primary',
      `data-complete:border-primary data-complete:bg-primary data-complete:text-primary-foreground`,
      props.class,
    )"
  >
    <slot />
  </Steps.Indicator>
</template>
