<script setup lang="ts">
import type { StepsListProps } from '@ark-ui/vue/steps'
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Steps.List
    data-scope="steps"
    data-part="list"
    v-bind="forwardedProps"
    :class="cn(
      'flex w-full items-start gap-2',
      props.class,
    )"
  >
    <slot />
  </Steps.List>
</template>
