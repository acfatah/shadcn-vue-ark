<script lang="ts" setup>
import type { DatePickerTableHeadProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableHeadProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.TableHead
    v-bind="forwardedProps"
    data-scope="range-calendar"
    data-part="grid-head"
    :class="cn(props.class)"
  >
    <slot />
  </DatePicker.TableHead>
</template>
