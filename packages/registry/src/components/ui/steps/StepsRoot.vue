<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { StepsRootEmits, StepsRootProps } from './types'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<StepsRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Steps.Root
    data-scope="steps"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      'flex w-full flex-col gap-4',
      props.class,
    )"
  >
    <slot />
  </Steps.Root>
</template>
