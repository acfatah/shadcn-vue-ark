<script setup lang="ts">
import type {
  CollectionItem,
  ComboboxRootEmits,
  ComboboxRootProps,
} from '@ark-ui/vue/combobox'

import { Combobox } from '@ark-ui/vue/combobox'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

const props = defineProps<ComboboxRootProps<CollectionItem>>()
const emit = defineEmits<ComboboxRootEmits<CollectionItem>>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <Combobox.Root v-bind="forwardedProps">
    <slot />
  </Combobox.Root>
</template>
