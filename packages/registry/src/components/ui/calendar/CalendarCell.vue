<script lang="ts" setup>
import type { DatePickerTableCellProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableCellProps {
  value: DatePickerTableCellProps['value']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.TableCell
    :class="cn(`
      relative flex-1 p-0 text-center text-sm
      focus-within:relative focus-within:z-20
      [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent
    `, props.class)"
    :value="props.value"
    v-bind="forwardedProps"
  >
    <slot />
  </DatePicker.TableCell>
</template>
