<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { computed, ref } from 'vue'
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
const ariaInvalid = computed(() => (props.invalid || nativeInvalid.value) ? 'true' : undefined)
const hideIcon = computed(() => props.hideIcon ? '' : undefined)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <PrimitiveInput
    scope="week-input"
    type="week"
    :hide-icon="hideIcon"
    :aria-invalid="ariaInvalid"
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

html.dark input[data-scope='week-input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.7);
}

input[data-scope='week-input'][hide-icon]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
