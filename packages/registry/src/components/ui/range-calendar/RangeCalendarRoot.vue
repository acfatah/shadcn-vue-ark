<script lang="ts" setup>
import type { DatePickerRootEmits, DatePickerRootProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNextButton,
  RangeCalendarPrevButton,
} from '.'

interface Props extends DatePickerRootProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  inline: true,
  selectionMode: 'range',
  numOfMonths: 2,
})

const emit = defineEmits<DatePickerRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const monthOffsets = computed(() =>
  Array.from(
    { length: props.numOfMonths ?? 1 },
    (_, index) => index,
  ),
)
</script>

<template>
  <DatePicker.Root
    v-bind="forwardedProps"
    data-scope="range-calendar"
    data-part="root"
    :class="cn('max-w-lg p-3', props.class)"
  >
    <DatePicker.View view="day">
      <DatePicker.Context v-slot="api">
        <RangeCalendarHeader>
          <RangeCalendarHeading />

          <div class="flex items-center gap-1">
            <RangeCalendarPrevButton />
            <RangeCalendarNextButton />
          </div>
        </RangeCalendarHeader>

        <div
          class="
            mt-4 flex flex-col gap-y-4
            sm:flex-row sm:gap-x-4 sm:gap-y-0
          "
        >
          <RangeCalendarGrid v-for="offset in monthOffsets" :key="offset">
            <RangeCalendarGridHead>
              <RangeCalendarGridRow>
                <RangeCalendarHeadCell v-for="(weekDay, id) in api.weekDays" :key="id">
                  {{ weekDay.short }}
                </RangeCalendarHeadCell>
              </RangeCalendarGridRow>
            </RangeCalendarGridHead>
            <RangeCalendarGridBody>
              <RangeCalendarGridRow
                v-for="(weekDates, index) in api.getOffset({ months: offset }).weeks"
                :key="index"
                class="mt-2 w-full"
              >
                <RangeCalendarCell
                  v-for="(weekDate, dayIndex) in weekDates"
                  :key="dayIndex"
                  :value="weekDate"
                  :visible-range="api.getOffset({ months: offset }).visibleRange"
                >
                  <RangeCalendarCellTrigger>
                    {{ weekDate.day }}
                  </RangeCalendarCellTrigger>
                </RangeCalendarCell>
              </RangeCalendarGridRow>
            </RangeCalendarGridBody>
          </RangeCalendarGrid>
        </div>
      </DatePicker.Context>
    </DatePicker.View>
  </DatePicker.Root>
</template>
