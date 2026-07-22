<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SelectItemGroupLabelProps } from './types'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SelectItemGroupLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.ItemGroupLabel
    v-bind="forwardedProps"
    :class="cn(
      'px-2 py-1.5 text-xs text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </Select.ItemGroupLabel>
</template>
