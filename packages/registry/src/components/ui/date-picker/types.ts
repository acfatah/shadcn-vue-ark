import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

import type { LayoutTypes } from '../calendar/types'

export type { LayoutTypes } from '../calendar/types'

export interface DatePickerRootProps {
  class?: HTMLAttributes['class']
  modelValue?: DateValue
  defaultValue?: DateValue
  layout?: LayoutTypes
  placeholder?: string
  formatOptions?: Intl.DateTimeFormatOptions
  locale?: string
  closeOnSelect?: boolean
  disabled?: boolean
  invalid?: boolean
  calendarProps?: Record<string, any>
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export interface DatePickerRootEmits {
  'update:modelValue': [value: DateValue | undefined]
}

export interface DatePickerInputProps {
  id?: string
  name?: string
  class?: HTMLAttributes['class']
  autocomplete?: string
  disabled?: boolean
  invalid?: boolean
  max?: string
  min?: string
  readonly?: boolean
  required?: boolean
  step?: number | string
}
