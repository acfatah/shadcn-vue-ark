<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { StepsItemProps } from './types'

import { Steps } from '@ark-ui/vue/steps'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends StepsItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <!-- @vue-expect-error `index` is forwarded via the v-bind spread; vue-tsc can't infer it through useForwardPropsEmits -->
  <Steps.Item
    data-scope="steps"
    data-part="item"
    v-bind="forwardedProps"
    :class="cn(
      'group relative flex w-full flex-col items-center justify-center gap-2',
      props.class,
    )"
  >
    <slot />
  </Steps.Item>
</template>
