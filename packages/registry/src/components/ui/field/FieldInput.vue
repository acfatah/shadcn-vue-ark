<script setup lang="ts">
import type { FieldInputProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

type Props = FieldInputProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  'update:modelValue': [value: FieldInputProps['modelValue']]
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Input.Text v-bind="forwardedProps" />
</template>
