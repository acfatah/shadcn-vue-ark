<script setup lang="ts">
import type { PinInputControlProps } from '@ark-ui/vue/pin-input'
import type { HTMLAttributes } from 'vue'

import { PinInput } from '@ark-ui/vue/pin-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends PinInputControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <PinInput.Control
    v-bind="forwardedProps"
    data-scope="input-otp"
    data-part="group"
    :class="cn('flex items-center', props.class)"
  >
    <slot />
  </PinInput.Control>
</template>
