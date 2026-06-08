<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

// Unable to extend CheckboxGroupProps.
// [@vue/compiler-sfc] Failed to resolve extends base type for Vue v3.3+
// See: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/checkbox/checkbox-group.vue
interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Group
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot />
  </Checkbox.Group>
</template>
