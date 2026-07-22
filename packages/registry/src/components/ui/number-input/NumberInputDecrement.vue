<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NumberInputDecrementTriggerBaseProps } from './types'

import { NumberInput } from '@ark-ui/vue/number-input'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends NumberInputDecrementTriggerBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NumberInput.DecrementTrigger
    v-bind="forwardedProps"
    :class="cn(
      'absolute top-1/2 left-0 -translate-y-1/2 p-3',
      'disabled:cursor-not-allowed disabled:opacity-20',
      props.class,
    )"
  >
    <slot>
      <Icon icon="mdi:minus" class="size-4" />
    </slot>
  </NumberInput.DecrementTrigger>
</template>
