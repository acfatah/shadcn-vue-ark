<script setup lang="ts">
import type { RadioGroupItemHiddenInputProps } from '@ark-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'

import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupItemHiddenInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <RadioGroup.ItemHiddenInput
    v-bind="forwardedProps"
    :class="cn(
      `sr-only`,
      props.class,
    )"
  >
    <slot />
  </RadioGroup.ItemHiddenInput>
</template>
