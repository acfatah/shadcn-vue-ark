<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { ref } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'
import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  hideSpinner?: boolean
}

interface Emits extends PrimitiveInputEmits {}

const props = withDefaults(defineProps<Props>(), {
  hideSpinner: false,
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['hideSpinner'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const nativeInvalid = ref(false)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <PrimitiveInput
    scope="number-input"
    type="number"
    :class="cn(
      'placeholder:opacity-30',
      props.hideSpinner && 'no-spinner',
      props.class,
    )"
    :aria-invalid="nativeInvalid"
    v-bind="forwardedProps"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>

<style lang="css">
.no-spinner[data-scope='number-input']::-webkit-inner-spin-button,
.no-spinner[data-scope='number-input']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
