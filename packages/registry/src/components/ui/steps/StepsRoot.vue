<script setup lang="ts">
import type { StepsRootProps } from '@ark-ui/vue/steps'
import type { HTMLAttributes } from 'vue'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
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
