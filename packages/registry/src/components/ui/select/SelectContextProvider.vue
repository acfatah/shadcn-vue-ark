<script setup lang="ts">
import { useSelectContext as useArkSelectContext } from '@ark-ui/vue/select'
import { computed } from 'vue'

import { SelectProvider } from '.'

interface Props {
  invalid?: boolean
  loading?: boolean
  nativeInvalid: boolean
  setNativeInvalid: (value?: boolean) => void
}

const props = defineProps<Props>()
const selectContext = useArkSelectContext()

const extended = computed(() => ({
  ...selectContext.value,
  loading: Boolean(props.loading),
  disabled: selectContext.value.disabled || Boolean(props.loading),
  invalid: Boolean(props.invalid) || props.nativeInvalid,
  nativeInvalid: props.nativeInvalid,
  setNativeInvalid: props.setNativeInvalid,
}))

SelectProvider(extended)
</script>

<template>
  <slot />
</template>
