<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { DatePickerViewTriggerProps } from './types'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerViewTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.ViewTrigger
    v-bind="forwardedProps"
    data-scope="range-calendar"
    data-part="heading"
    :class="cn(
      'text-sm font-medium',
      props.class,
    )"
  >
    <slot>
      <DatePicker.RangeText />
    </slot>
  </DatePicker.ViewTrigger>
</template>
