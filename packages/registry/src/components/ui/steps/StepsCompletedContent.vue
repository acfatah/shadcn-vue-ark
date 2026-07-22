<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { StepsCompletedContentProps } from './types'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsCompletedContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.CompletedContent
    data-scope="steps"
    data-part="completed-content"
    v-bind="forwardedProps"
    :class="cn(
      'mt-4 text-sm text-muted-foreground outline-none',
      props.class,
    )"
  >
    <slot />
  </Steps.CompletedContent>
</template>
