<script setup lang="ts">
import type { UseRadioGroupReturn } from '@ark-ui/vue/radio-group'
import type { UnwrapRef } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'

const props = defineProps<{
  value: UnwrapRef<UseRadioGroupReturn>
}>()
</script>

<template>
  <RadioGroup.RootProvider
    :value="props.value"
    v-bind="$attrs"
  >
    <slot />
  </RadioGroup.RootProvider>
</template>
