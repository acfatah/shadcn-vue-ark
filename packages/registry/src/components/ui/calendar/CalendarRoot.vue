<script lang="ts" setup>
import type { DatePickerRootEmits, DatePickerRootProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { LayoutTypes } from '.'

import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from '.'

interface Props extends DatePickerRootProps {
  class?: HTMLAttributes['class']
  layout?: LayoutTypes
}

const props = withDefaults(defineProps<Props>(), {
  inline: true,
  layout: undefined,
})

const emit = defineEmits<DatePickerRootEmits>()
const delegatedProps = reactiveOmit(props, 'class', 'layout')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <DatePicker.Root
    v-bind="forwardedProps"
    data-scope="calendar"
    data-part="root"
    :class="cn('w-2xs p-3', props.class)"
  >
    <DatePicker.View view="day">
      <DatePicker.Context v-slot="api">
        <CalendarHeader class="pt-0">
          <nav class="absolute inset-x-0 top-0 flex items-center justify-between gap-1">
            <CalendarPrevButton>
              <slot name="calendar-prev-icon" />
            </CalendarPrevButton>
            <CalendarNextButton>
              <slot name="calendar-next-icon" />
            </CalendarNextButton>
          </nav>

          <slot name="calendar-heading" :api="api">
            <template v-if="props.layout === 'month-and-year'">
              <div class="flex items-center justify-center gap-1">
                <div class="relative">
                  <div
                    class="
                      pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm
                    "
                  >
                    {{ api.format(api.focusedValue, { month: 'short' }) }}
                  </div>
                  <DatePicker.MonthSelect
                    class="
                      relative h-8 rounded-md border border-input bg-background pr-6 pl-2 text-xs
                      text-transparent shadow-xs
                    "
                  />
                </div>
                <div class="relative">
                  <div
                    class="
                      pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm
                    "
                  >
                    {{ api.format(api.focusedValue, { year: 'numeric' }) }}
                  </div>
                  <DatePicker.YearSelect
                    class="
                      relative h-8 rounded-md border border-input bg-background pr-6 pl-2 text-xs
                      text-transparent shadow-xs
                    "
                  />
                </div>
              </div>
            </template>
            <template v-else-if="props.layout === 'month-only'">
              <div class="flex items-center justify-center gap-1">
                <div class="relative">
                  <div
                    class="
                      pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm
                    "
                  >
                    {{ api.format(api.focusedValue, { month: 'short' }) }}
                  </div>
                  <DatePicker.MonthSelect
                    class="
                      relative h-8 rounded-md border border-input bg-background pr-6 pl-2 text-xs
                      text-transparent shadow-xs
                    "
                  />
                </div>
                <span class="text-sm font-medium">
                  {{ api.format(api.focusedValue, { year: 'numeric' }) }}
                </span>
              </div>
            </template>
            <template v-else-if="props.layout === 'year-only'">
              <div class="flex items-center justify-center gap-1">
                <span class="text-sm font-medium">
                  {{ api.format(api.focusedValue, { month: 'short' }) }}
                </span>
                <div class="relative">
                  <div
                    class="
                      pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm
                    "
                  >
                    {{ api.format(api.focusedValue, { year: 'numeric' }) }}
                  </div>
                  <DatePicker.YearSelect
                    class="
                      relative h-8 rounded-md border border-input bg-background pr-6 pl-2 text-xs
                      text-transparent shadow-xs
                    "
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <CalendarHeading />
            </template>
          </slot>
        </CalendarHeader>

        <div
          class="
            mt-4 flex flex-col gap-y-4
            sm:flex-row sm:gap-x-4 sm:gap-y-0
          "
        >
          <CalendarGrid>
            <CalendarGridHead>
              <CalendarGridRow>
                <CalendarHeadCell v-for="(weekDay, id) in api.weekDays" :key="id">
                  {{ weekDay.short }}
                </CalendarHeadCell>
              </CalendarGridRow>
            </CalendarGridHead>
            <CalendarGridBody>
              <CalendarGridRow v-for="(week, id) in api.weeks" :key="id" class="mt-2 w-full">
                <CalendarCell v-for="(day, dayId) in week" :key="dayId" :value="day">
                  <CalendarCellTrigger>
                    {{ day.day }}
                  </CalendarCellTrigger>
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      </DatePicker.Context>
    </DatePicker.View>
  </DatePicker.Root>
</template>
