<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { StepsSeparatorProps } from './types'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.Separator
    data-scope="steps"
    data-part="separator"
    v-bind="forwardedProps"
    :class="cn(
      `
        absolute top-5 right-[calc(-50%+24px)] left-[calc(50%+24px)] block h-0.5 shrink-0
        rounded-full bg-muted transition-colors
        data-complete:bg-primary
      `,
      props.class,
    )"
  />
</template>
