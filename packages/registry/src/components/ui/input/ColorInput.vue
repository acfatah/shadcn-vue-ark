<script setup lang="ts">
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'

import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {}
interface Emits extends PrimitiveInputEmits {}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const forwardedProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <PrimitiveInput
    scope="color-input"
    type="color"
    :class="props.class"
    v-bind="forwardedProps"
    class="w-16"
  />
</template>
