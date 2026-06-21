import type { ComputedRef, Ref } from 'vue'

import { createContext } from '@/composables/createContext'

import type { HourCycle, Period } from './types'

export interface TimePickerContext {
  timeValue: Ref<string>
  placeholder: ComputedRef<string>
  hourCycle: ComputedRef<HourCycle>
  disabled: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  step: ComputedRef<number>
  setTime: (val: string) => void
  setHour: (h: number) => void
  setMinute: (m: number) => void
  setPeriod: (period: Period) => void
  setOpen: (val: boolean) => void
}

export const [TimePickerProvider, useTimePickerContext]
  = createContext<TimePickerContext>('TimePickerContext')
