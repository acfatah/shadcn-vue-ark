<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from '@ark-ui/vue/pin-input'
import type { HTMLAttributes } from 'vue'

import { PinInput } from '@ark-ui/vue/pin-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PinInputRootProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  otp: true,
})
const emit = defineEmits<PinInputRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <PinInput.Root
    v-slot="slotProps"
    v-bind="forwardedProps"
    data-scope="input-otp"
    data-part="root"
    :class="cn(
      `
        flex items-center gap-2
        data-disabled:cursor-not-allowed data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </PinInput.Root>
</template>
