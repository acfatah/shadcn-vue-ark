<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

// Group props are written INLINE here: Vue v3.3+'s compiler can't resolve an
// `extends` base type imported from './types' for the SFC macro
// ([@vue/compiler-sfc] Failed to resolve extends base type). Keep this in sync
// with CheckboxGroupProps / CheckboxGroupEmits in ./types.
interface Props {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
  /** The initial value of `value` when uncontrolled */
  defaultValue?: string[]
  /** The controlled value of the checkbox group */
  modelValue?: string[]
  /** If `true`, the checkbox group is disabled */
  disabled?: boolean
  /** If `true`, the checkbox group is read-only */
  readOnly?: boolean
  /**
   * The name of the input fields in the checkbox group
   * (Useful for form submission).
   */
  name?: string
  /** If `true`, the checkbox group is invalid */
  invalid?: boolean
  /** The maximum number of selected values */
  maxSelectedValues?: number
  class?: HTMLAttributes['class']
}

interface Emits {
  /** Functional called when the value changes. */
  'valueChange': [value: string[]]
  'update:modelValue': [value: string[]]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Checkbox.Group
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot />
  </Checkbox.Group>
</template>
