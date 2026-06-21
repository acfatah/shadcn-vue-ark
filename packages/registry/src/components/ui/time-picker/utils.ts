import type { HourCycle, Period } from './types'

// Single source of truth for the time-picker's 12<->24 conversion. The stored
// model value is always a 24-hour `HH:MM` string; these helpers only translate
// for display and for combining hour/period clicks back into 24-hour.

const TIME_RE = /^(\d{1,2}):(\d{1,2})/

export function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

export function clampHour(h: number): number {
  if (Number.isNaN(h))
    return 0

  return Math.max(0, Math.min(23, Math.trunc(h)))
}

export function clampMinute(m: number): number {
  if (Number.isNaN(m))
    return 0

  return Math.max(0, Math.min(59, Math.trunc(m)))
}

export function clampHour12(h: number): number {
  if (Number.isNaN(h))
    return 12

  return Math.max(1, Math.min(12, Math.trunc(h)))
}

export function parseTime(val: string | undefined): {
  hour: number
  minute: number
} {
  const match = TIME_RE.exec(val ?? '')
  if (!match)
    return { hour: 0, minute: 0 }

  return {
    hour: clampHour(Number(match[1])),
    minute: clampMinute(Number(match[2])),
  }
}

// 24-hour value (0-23) -> 12-hour display value (1-12).
export function to12(h24: number): number {
  const h = h24 % 12

  return h === 0 ? 12 : h
}

// (12-hour value 1-12, period) -> 24-hour value (0-23).
export function to24(h12: number, period: Period): number {
  if (period === 'AM')
    return h12 === 12 ? 0 : h12

  return h12 === 12 ? 12 : h12 + 12
}

export function periodOf(h24: number): Period {
  return h24 >= 12 ? 'PM' : 'AM'
}

export interface FormatTimeOptions {
  hourCycle: HourCycle
  placeholder: string
}

// Renders the stored 24-hour value for the trigger label. Returns the
// placeholder when the value is empty or unparseable.
export function formatTime(
  value: string | undefined,
  options: FormatTimeOptions,
): string {
  const match = TIME_RE.exec(value ?? '')
  if (!match)
    return options.placeholder

  const hour = clampHour(Number(match[1]))
  const minute = clampMinute(Number(match[2]))

  if (options.hourCycle === 24)
    return `${pad(hour)}:${pad(minute)}`

  return `${pad(to12(hour))}:${pad(minute)} ${periodOf(hour)}`
}
