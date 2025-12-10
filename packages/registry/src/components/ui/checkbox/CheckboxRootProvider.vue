<script setup lang="ts">
import type { UseCheckboxReturn } from '@ark-ui/vue/checkbox'
import type { UnwrapRef } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'

interface Props {
  value: UnwrapRef<UseCheckboxReturn>
}

const props = defineProps<Props>()
</script>

<template>
  <Checkbox.RootProvider
    :value="props.value"
    v-bind="$attrs"
  >
    <slot />
  </Checkbox.RootProvider>
</template>
