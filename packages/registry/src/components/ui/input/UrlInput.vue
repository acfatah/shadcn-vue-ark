<script setup lang="ts">
import { ref } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
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
const nativeInvalid = ref(false)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <PrimitiveInput
    scope="url-input"
    type="url"
    :aria-invalid="nativeInvalid"
    :class="props.class"
    v-bind="forwardedProps"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>
