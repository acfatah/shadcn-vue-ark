<script setup lang="ts">
import type { CheckboxHiddenInputProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends CheckboxHiddenInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.HiddenInput
    v-bind="forwardedProps"
    :class="cn(
      `peer sr-only`,
      props.class,
    )"
  >
    <slot />
  </Checkbox.HiddenInput>
</template>
