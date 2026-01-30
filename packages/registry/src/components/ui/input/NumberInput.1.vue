<script setup lang="ts">
import { ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

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
  <div class="relative" data-scope="number-input" data-part="wrapper">
    <PrimitiveInput
      scope="number-input"
      type="number"
      :class="cn(
        'pr-9',
        props.class,
      )"
      :aria-invalid="nativeInvalid"
      v-bind="forwardedProps"
      @invalid="handleInvalid"
      @input="nativeInvalid = false"
    />
  </div>
</template>

  <style lang="css">
[data-scope='number-input']::-webkit-inner-spin-button,
[data-scope='number-input']::-webkit-outer-spin-button {
  margin: auto;
  -webkit-appearance: none;
}

[data-part='wrapper'] {
  position: relative;
}

[data-part='wrapper']:focus-within::before,
[data-part='wrapper']:active::before {
  content: '▲'; /* Arrow symbol */
  position: absolute;
  top: 0;
  right: 5px;
  height: 50%; /* Take top half of the wrapper */
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #666;
  background: transparent;
  cursor: default; /* Indicate clickability */
  /* pointer-events: none; */
}

[data-part='wrapper']:focus-within::after,
[data-part='wrapper']:active::after {
  content: '▼'; /* Arrow symbol */
  position: absolute;
  bottom: 0;
  right: 5px;
  height: 50%; /* Take bottom half of the wrapper */
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #666;
  background: transparent;
  cursor: default;
  pointer-events: none; /* Let clicks pass through to wrapper (for JS) */
}
</style>
