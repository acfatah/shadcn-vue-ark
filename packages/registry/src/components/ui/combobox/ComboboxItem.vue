<script setup lang="ts">
import type { CollectionItem, ComboboxItemProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxItemProps {
  item: CollectionItem
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['class', 'disabled', 'item'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
const disabled = computed(() => props.disabled || props.item.disabled || undefined)
useForwardExpose()
</script>

<template>
  <Combobox.Item
    data-scope="combobox"
    data-part="item"
    v-bind="forwardedProps"
    :item="props.item"
    :data-disabled="disabled"
    :class="cn(
      `
        relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
        outline-hidden select-none
      `,
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
      `
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
        [&_svg:not([class*='text-'])]:text-muted-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </Combobox.Item>
</template>
