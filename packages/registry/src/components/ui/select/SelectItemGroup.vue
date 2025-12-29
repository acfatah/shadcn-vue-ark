<script setup lang="ts">
import type { SelectItemGroupProps } from '@ark-ui/vue/select'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemGroupProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.ItemGroup
    v-bind="forwardedProps"
    :class="cn(
      'p-1',
      props.class,
    )"
  >
    <slot />
  </Select.ItemGroup>
</template>
