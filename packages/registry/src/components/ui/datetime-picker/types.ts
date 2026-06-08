import type { CalendarDateTime } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

import type { LayoutTypes } from '../calendar/types'

export type { LayoutTypes } from '../calendar/types'

export type HourCycle = 12 | 24

export interface DatetimePickerRootProps {
  class?: HTMLAttributes['class']
  modelValue?: CalendarDateTime
  defaultValue?: CalendarDateTime
  layout?: LayoutTypes
  placeholder?: string
  formatOptions?: Intl.DateTimeFormatOptions
  locale?: string
  hourCycle?: HourCycle
  disabled?: boolean
  invalid?: boolean
  calendarProps?: Record<string, any>
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export interface DatetimePickerRootEmits {
  'update:modelValue': [value: CalendarDateTime | undefined]
}
