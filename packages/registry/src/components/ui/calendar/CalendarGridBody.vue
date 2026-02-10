<script lang="ts" setup>
import type { DatePickerTableBodyProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableBodyProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.TableBody
    v-bind="forwardedProps"
    data-scope="calendar"
    data-part="grid-body"
    :class="cn(props.class)"
  >
    <slot />
  </DatePicker.TableBody>
</template>
