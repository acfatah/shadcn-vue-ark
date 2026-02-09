<script lang="ts" setup>
import type { DatePickerViewControlProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerViewControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.ViewControl
    v-bind="forwardedProps"
    data-scope="calendar"
    data-part="header"
    :class="cn(
      'relative flex w-full items-center justify-center px-8 pt-1',
      props.class,
    )"
  >
    <slot />
  </DatePicker.ViewControl>
</template>
