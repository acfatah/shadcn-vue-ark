<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { SelectItemTextProps } from './types'

interface Props extends SelectItemTextProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
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
