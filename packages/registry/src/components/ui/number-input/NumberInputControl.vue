<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { NumberInput } from '@ark-ui/vue/number-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

import type { NumberInputControlBaseProps } from './types'

interface Props extends NumberInputControlBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NumberInput.Control
    v-bind="forwardedProps"
    :class="cn(
      'relative',
      `
        *:data-[part=input]:has-data-[part=decrement-trigger]:pl-5
        *:data-[part=input]:has-data-[part=increment-trigger]:pr-5
      `,
      props.class,
    )"
  >
    <slot />
  </NumberInput.Control>
</template>
