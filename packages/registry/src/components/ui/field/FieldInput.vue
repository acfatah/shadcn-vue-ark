<script setup lang="ts">
import type { FieldInputProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'

import { useFieldContext } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

type Props = FieldInputProps & {
  class?: HTMLAttributes['class']
  disabled?: boolean
  invalid?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  'update:modelValue': [value: FieldInputProps['modelValue']]
}>()
const fieldContext = useFieldContext()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => fieldContext.value.disabled || props.disabled)
const invalid = computed(() => fieldContext.value.invalid || props.invalid)
</script>

<template>
  <Input.Text
    v-bind="forwardedProps"
    :disabled="disabled"
    :invalid="invalid"
  />
</template>
