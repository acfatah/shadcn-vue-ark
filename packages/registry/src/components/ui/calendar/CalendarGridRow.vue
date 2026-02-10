<script lang="ts" setup>
import type { DatePickerTableRowProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableRowProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.TableRow
    v-bind="forwardedProps"
    data-scope="calendar"
    data-part="grid-row"
    :class="cn('flex', props.class)"
  >
    <slot />
  </DatePicker.TableRow>
</template>
