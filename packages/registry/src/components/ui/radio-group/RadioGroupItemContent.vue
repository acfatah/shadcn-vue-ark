<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { RadioGroupItemContentProps } from './types'

interface Props extends RadioGroupItemContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="radio-group"
    data-part="item-content"
    v-bind="forwardedProps"
    :class="cn(
      'flex flex-col gap-2',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
