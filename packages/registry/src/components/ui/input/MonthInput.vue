<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type {
  PrimitiveInputEmits,
  PrimitiveInputProps,
} from './types'

import PrimitiveInput from './PrimitiveInput.vue'

interface Props extends /* @vue-ignore */ Omit<PrimitiveInputProps, 'scope' | 'type'> {
  hideIcon?: boolean
}

interface Emits extends /* @vue-ignore */ PrimitiveInputEmits {}

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
    scope="month-input"
    type="month"
    :hide-icon="hideIcon"
    :aria-invalid="ariaInvalid"
    :class="props.class"
    v-bind="forwardedProps"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>

<style lang="css">
input[data-scope='month-input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.4);
}

html.dark input[data-scope='month-input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.7);
}

input[data-scope='month-input'][hide-icon]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
