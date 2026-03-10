<script setup lang="ts">
import type { NumberInputRootEmits, NumberInputRootProps } from '@ark-ui/vue/number-input'
import type { HTMLAttributes } from 'vue'

import { NumberInput } from '@ark-ui/vue/number-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends NumberInputRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<NumberInputRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <NumberInput.Root
    v-bind="forwardedProps"
    :class="cn('grid gap-1.5', props.class)"
  >
    <slot />
  </NumberInput.Root>
</template>
