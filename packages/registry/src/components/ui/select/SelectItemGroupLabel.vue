<script setup lang="ts">
import type { SelectItemGroupLabelProps } from '@ark-ui/vue/select'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemGroupLabelProps>()
const delegatedProps = reactiveOmit(props, 'class')
useForwardExpose()
</script>

<template>
  <Select.ItemGroupLabel
    v-bind="delegatedProps"
    :class="cn(
      'px-2 py-1.5 text-xs text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </Select.ItemGroupLabel>
</template>
