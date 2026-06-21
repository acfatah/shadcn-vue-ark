import type { HTMLAttributes } from 'vue'

export type Period = 'AM' | 'PM'

export type HourCycle = 12 | 24

export interface TimePickerRootProps {
  class?: HTMLAttributes['class']

  /** Controlled 24-hour `HH:MM` value. */
  modelValue?: string

  /** Initial 24-hour `HH:MM` value when uncontrolled. */
  defaultValue?: string

  /**
   * Trigger placeholder shown when empty. Defaults to `hh:mm AM/PM` in 12-hour
   * mode and `HH:MM` in 24-hour mode.
   */
  placeholder?: string

  /** 12- or 24-hour display. The emitted value is always 24-hour. */
  hourCycle?: HourCycle

  disabled?: boolean

  invalid?: boolean

  /** Minute increment for the minute column (1-30). */
  step?: number

  align?: 'start' | 'center' | 'end'

  alignOffset?: number

  side?: 'top' | 'right' | 'bottom' | 'left'

  sideOffset?: number
}

export interface TimePickerRootEmits {
  'update:modelValue': [value: string]
}

export interface TimePickerTriggerProps {
  class?: HTMLAttributes['class']
}

export interface TimePickerContentProps {
  class?: HTMLAttributes['class']
}
