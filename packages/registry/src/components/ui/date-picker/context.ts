import type { DateValue } from '@internationalized/date'
import type { ComputedRef, Ref } from 'vue'

import { createContext } from '@/composables/createContext'

import type { LayoutTypes } from '../calendar/types'

export interface DatePickerContext {
  dateValue: Ref<DateValue | undefined>
  layout: ComputedRef<LayoutTypes>
  placeholder: ComputedRef<string>
  formatOptions: ComputedRef<Intl.DateTimeFormatOptions>
  locale: ComputedRef<string>
  closeOnSelect: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  calendarProps: ComputedRef<Record<string, any>>
  setDate: (val: DateValue | undefined) => void
  setOpen: (val: boolean) => void
}

export const [DatePickerProvider, useDatePickerContext]
  = createContext<DatePickerContext>('DatePickerContext')
