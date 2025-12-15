<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { ref } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from './PrimitiveInput.vue'
import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  hideIcon?: boolean
}

interface Emits extends PrimitiveInputEmits {}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, 'hideIcon')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
const nativeInvalid = ref(false)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <PrimitiveInput
    scope="week-input"
    type="week"
    :data-hide-icon="props.hideIcon ?? undefined"
    :aria-invalid="nativeInvalid"
    :class="props.class"
    v-bind="forwardedProps"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>

<style lang="css">
input[data-scope='week-input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.4);
}

input[data-hide-icon='true'][data-scope='week-input']::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
