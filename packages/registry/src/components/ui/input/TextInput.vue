<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { computed, ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'

import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  class?: HTMLAttributes['class']
}

interface Emits extends PrimitiveInputEmits {}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const forwardedProps = useForwardPropsEmits(props, emits)
const nativeInvalid = ref(false)
const ariaInvalid = computed(() => (props.invalid || nativeInvalid.value) ? 'true' : undefined)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <PrimitiveInput
    scope="text-input"
    type="text"
    :aria-invalid="ariaInvalid"
    v-bind="forwardedProps"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>
