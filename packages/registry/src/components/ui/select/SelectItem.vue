<script setup lang="ts">
import type { CollectionItem, SelectItemProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import SelectItemIndicator from './SelectItemIndicator.vue'
import SelectItemText from './SelectItemText.vue'

interface Props extends SelectItemProps {
  item: CollectionItem
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const disabled = computed(() => props.disabled || props.item.disabled || undefined)
useForwardExpose()
</script>

<template>
  <Select.Item
    v-bind="forwardedProps"
    :data-disabled="disabled"
    :item="props.item"
    :class="cn(
      `
        relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm
        outline-hidden select-none
      `,
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
      `
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
        [&_svg:not([class*='text-'])]:text-muted-foreground
        *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2
      `,
      props.class,
    )"
  >
    <slot>
      <SelectItemText>
        {{ props.item.label }}
      </SelectItemText>
      <SelectItemIndicator />
    </slot>
  </Select.Item>
</template>
