<script setup lang="ts">
import type { ComboboxItemIndicatorProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxItemIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Combobox.ItemIndicator
    data-scope="combobox"
    data-part="item-indicator"
    v-bind="forwardedProps"
    :class="cn('ml-auto', props.class)"
  >
    <slot />
  </Combobox.ItemIndicator>
</template>
