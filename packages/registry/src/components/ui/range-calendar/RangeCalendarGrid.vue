<script lang="ts" setup>
import type { DatePickerTableProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.Table
    data-scope="range-calendar"
    data-part="grid"
    :class="cn(
      'w-full border-collapse space-x-1',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </DatePicker.Table>
</template>
