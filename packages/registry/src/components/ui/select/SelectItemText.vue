<script setup lang="ts">
import type { SelectItemTextProps } from '@ark-ui/vue/select'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemTextProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.ItemText
    v-bind="forwardedProps"
    :class="cn(
      'truncate',
      props.class,
    )"
  >
    <slot />
  </Select.ItemText>
</template>
