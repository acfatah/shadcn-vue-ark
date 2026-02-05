<script setup lang="ts">
import type {
  CollectionItem,
  ComboboxRootEmits,
  ComboboxRootProps,
} from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends ComboboxRootProps<CollectionItem> {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<ComboboxRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Combobox.Root
    v-bind="forwardedProps"
    data-scope="combobox"
    data-part="root"
    :class="props.class"
  >
    <slot />
  </Combobox.Root>
</template>
