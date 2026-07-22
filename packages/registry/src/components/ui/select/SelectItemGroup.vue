<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SelectItemGroupProps } from './types'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SelectItemGroupProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
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
