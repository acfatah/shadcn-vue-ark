<script setup lang="ts">
import type { ComboboxItemGroupProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxItemGroupProps {
  class?: HTMLAttributes['class']
  heading?: string
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Combobox.ItemGroup
    data-scope="combobox"
    data-part="item-group"
    v-bind="forwardedProps"
    :class="cn(
      'overflow-hidden p-1 text-foreground',
      props.class,
    )"
  >
    <Combobox.ItemGroupLabel
      v-if="heading"
      data-scope="combobox"
      data-part="item-group-label"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </Combobox.ItemGroupLabel>
    <slot />
  </Combobox.ItemGroup>
</template>
