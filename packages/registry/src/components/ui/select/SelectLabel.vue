<script setup lang="ts">
import type { LabelProps } from '@/components/ui/label'
import { Label } from '@/components/ui/label'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

const props = defineProps<LabelProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Label
    data-scope="select"
    data-part="label"
    v-bind="forwardedProps"
  >
    <slot />
  </Label>
</template>
