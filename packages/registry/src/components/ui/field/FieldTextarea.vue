<script setup lang="ts">
import type { FieldTextareaProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

type Props = FieldTextareaProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  'update:modelValue': [value: FieldTextareaProps['modelValue']]
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Input.Textarea v-bind="forwardedProps" />
</template>
