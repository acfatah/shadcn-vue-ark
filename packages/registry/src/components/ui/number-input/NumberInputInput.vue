<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NumberInputInputBaseProps } from './types'

import { NumberInput } from '@ark-ui/vue/number-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends NumberInputInputBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NumberInput.Input
    v-bind="forwardedProps"
    :class="cn(
      'flex h-9 w-full py-1',
      'rounded-md border border-input bg-transparent shadow-sm',
      'text-center text-sm',
      'transition-colors',
      'placeholder:text-muted-foreground',
      'focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  />
</template>
