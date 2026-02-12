<script setup lang="ts">
import type { PinInputInputProps } from '@ark-ui/vue/pin-input'
import type { HTMLAttributes } from 'vue'

import { PinInput } from '@ark-ui/vue/pin-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends PinInputInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <PinInput.Input
    data-scope="input-otp"
    data-part="slot"
    v-bind="forwardedProps"
    :class="cn(
      `
        relative flex size-9 items-center justify-center border-y border-r border-input text-center
        text-sm shadow-xs transition-all outline-none
        first:rounded-l-md first:border-l
        last:rounded-r-md
        focus:z-10 focus:border-ring focus:ring-[3px] focus:ring-ring/50
        aria-invalid:border-destructive
        focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20
        dark:bg-input/30
        dark:focus:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  />
</template>
