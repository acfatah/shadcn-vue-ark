<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
  toCalendarDate,
} from '@internationalized/date'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import CalendarRoot from '../calendar/CalendarRoot.vue'
import PopoverContent from '../popover/PopoverContent.vue'
import SeparatorRoot from '../separator/Separator.vue'
import { useDatetimePickerContext } from './context'
import DatetimePickerTimeScroll
  from './DatetimePickerTimeScroll.vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const ctx = useDatetimePickerContext()!

const calendarModelValue = computed(() => {
  if (!ctx.datetimeValue.value)
    return undefined

  return [toCalendarDate(ctx.datetimeValue.value)]
})

function onDateSelect(value: DateValue[]) {
  const date = value[0]
  if (!date)
    return

  const current = ctx.datetimeValue.value
  const hour = current?.hour ?? now(getLocalTimeZone()).hour
  const minute = current?.minute ?? now(getLocalTimeZone()).minute

  const dt = new CalendarDateTime(
    date.year,
    date.month,
    date.day,
    hour,
    minute,
  )

  ctx.setDatetime(dt)
}

function onClear() {
  ctx.setDatetime(undefined)
}

function onToday() {
  const current = ctx.datetimeValue.value
  const todayNow = now(getLocalTimeZone())

  const dt = new CalendarDateTime(
    todayNow.year,
    todayNow.month,
    todayNow.day,
    current?.hour ?? todayNow.hour,
    current?.minute ?? todayNow.minute,
  )

  ctx.setDatetime(dt)
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
      <div class="flex max-h-[320px]">
        <div class="flex flex-col">
          <CalendarRoot
            :model-value="calendarModelValue"
            :layout="ctx.layout.value"
            v-bind="ctx.calendarProps.value"
            @update:model-value="onDateSelect"
          />

          <SeparatorRoot class="mx-2 max-w-[268px]" />

          <div class="flex justify-between px-3 py-2">
            <button
              class="
                rounded-sm border border-transparent text-sm text-muted-foreground
                hover:text-foreground
                focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none
              "
              @click="onClear"
            >
              Clear
            </button>
            <button
              class="
                rounded-sm border border-transparent text-sm text-muted-foreground
                hover:text-foreground
                focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none
              "
              @click="onToday"
            >
              Today
            </button>
          </div>
        </div>

        <DatetimePickerTimeScroll />
      </div>
    </slot>
  </PopoverContent>
</template>
