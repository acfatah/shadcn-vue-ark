<script setup lang="ts">
import type { SelectControlProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends SelectControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Select.Control v-bind="forwardedProps">
    <slot />
  </Select.Control>
</template>
