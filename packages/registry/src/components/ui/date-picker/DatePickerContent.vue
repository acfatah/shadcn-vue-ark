<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

import { computed } from 'vue'

import { cn } from '@/lib/utils'

import CalendarRoot from '../calendar/CalendarRoot.vue'
import PopoverContent from '../popover/PopoverContent.vue'
import { useDatePickerContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const ctx = useDatePickerContext()!

const calendarModelValue = computed(() => {
  return ctx.dateValue.value ? [ctx.dateValue.value] : undefined
})

function onDateSelect(value: DateValue[]) {
  ctx.setDate(value[0])
}
</script>

<template>
  <PopoverContent
    :class="cn(
      'relative w-auto p-0',
      props.class,
    )"
  >
    <slot>
      <CalendarRoot
        :model-value="calendarModelValue"
        :layout="ctx.layout.value"
        v-bind="ctx.calendarProps.value"
        @update:model-value="onDateSelect"
      />
    </slot>
  </PopoverContent>
</template>
