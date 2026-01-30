<script lang="ts" setup>
import type { DatePickerRootEmits, DatePickerRootProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

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
}

const props = withDefaults(defineProps<Props>(), {
  inline: true,
})

const emit = defineEmits<DatePickerRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <DatePicker.Root
    v-bind="forwardedProps"
    :class="cn('p-3', props.class)"
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
            <CalendarHeading />
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

    <DatePicker.View view="month">
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
            <CalendarHeading />
          </slot>
        </CalendarHeader>

        <div class="mt-4">
          <CalendarGrid>
            <CalendarGridBody>
              <CalendarGridRow
                v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                :key="id"
                class="mt-2 w-full"
              >
                <CalendarCell v-for="(month, monthId) in months" :key="monthId" :value="month.value">
                  <CalendarCellTrigger>
                    {{ month.label }}
                  </CalendarCellTrigger>
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      </DatePicker.Context>
    </DatePicker.View>

    <DatePicker.View view="year">
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
            <CalendarHeading />
          </slot>
        </CalendarHeader>

        <div class="mt-4">
          <CalendarGrid>
            <CalendarGridBody>
              <CalendarGridRow
                v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                :key="id"
                class="mt-2 w-full"
              >
                <CalendarCell v-for="(year, yearId) in years" :key="yearId" :value="year.value">
                  <CalendarCellTrigger>
                    {{ year.label }}
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
