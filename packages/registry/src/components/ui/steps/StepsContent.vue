<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { StepsContentProps } from './types'

interface Props extends StepsContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.Content
    data-scope="steps"
    data-part="content"
    v-bind="forwardedProps"
    :class="cn(
      'mt-4 text-sm text-muted-foreground outline-none',
      props.class,
    )"
  >
    <slot />
  </Steps.Content>
</template>
