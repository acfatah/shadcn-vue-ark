<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

// Unable to extend CheckboxGroupProps.
// [@vue/compiler-sfc] Failed to resolve extends base type for Vue v3.3+
// See: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/checkbox/checkbox-group.vue
interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Checkbox.Group v-bind="forwardedProps">
    <slot />
  </Checkbox.Group>
</template>
