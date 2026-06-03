import type { CalendarDateTime } from '@internationalized/date'
import type { ComputedRef, Ref } from 'vue'

import { createContext } from '@/composables/createContext'

import type { HourCycle, LayoutTypes } from './types'

export interface DatetimePickerContext {
  datetimeValue: Ref<CalendarDateTime | undefined>
  layout: ComputedRef<LayoutTypes>
  placeholder: ComputedRef<string>
  formatOptions: ComputedRef<Intl.DateTimeFormatOptions>
  locale: ComputedRef<string>
  hourCycle: ComputedRef<HourCycle>
  disabled: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  calendarProps: ComputedRef<Record<string, any>>
  setDatetime: (val: CalendarDateTime | undefined) => void
  setOpen: (val: boolean) => void
}

export const [
  DatetimePickerProvider,
  useDatetimePickerContext,
] = createContext<DatetimePickerContext>(
  'DatetimePickerContext',
)
