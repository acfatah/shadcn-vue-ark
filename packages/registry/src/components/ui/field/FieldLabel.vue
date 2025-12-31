<script setup lang="ts">
import type { FieldLabelProps } from '@ark-ui/vue/field'
import type { LabelProps } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends LabelProps, FieldLabelProps {}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Input.Label v-bind="forwardedProps">
    <slot />
  </Input.Label>
</template>
