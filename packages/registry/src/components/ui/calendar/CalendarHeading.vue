<script lang="ts" setup>
import type { DatePickerViewTriggerProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
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
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot>
      <DatePicker.RangeText />
    </slot>
  </DatePicker.ViewTrigger>
</template>
