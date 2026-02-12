<script setup lang="ts">
import type { PinInputHiddenInputProps } from '@ark-ui/vue/pin-input'
import type { HTMLAttributes } from 'vue'

import { PinInput } from '@ark-ui/vue/pin-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PinInputHiddenInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <PinInput.HiddenInput
    v-bind="forwardedProps"
    data-scope="input-otp"
    data-part="hidden-input"
    :class="cn('sr-only', props.class)"
  >
    <slot />
  </PinInput.HiddenInput>
</template>
