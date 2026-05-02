import type { DateValue } from '@internationalized/date'

import { parseDate } from '@internationalized/date'

export function toDateValue(iso: string | null | undefined): DateValue | undefined {
  if (!iso)
    return undefined

  try {
    return parseDate(iso.slice(0, 10))
  }
  catch {
    console.warn(`Unable to parse date value from ISO string: ${iso}`)

    return undefined
  }
}

export function fromDateValue(val: DateValue | undefined): string {
  return val ? val.toString() : ''
}
