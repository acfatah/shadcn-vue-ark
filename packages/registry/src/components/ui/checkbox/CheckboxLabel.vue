<script setup lang="ts">
import type { CheckboxLabelProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Label } from '@/components/ui/label'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends CheckboxLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Checkbox.Label as-child>
    <Label
      data-scope="checkbox"
      data-part="label"
      v-bind="forwardedProps"
    >
      <slot />
    </Label>
  </Checkbox.Label>
</template>
