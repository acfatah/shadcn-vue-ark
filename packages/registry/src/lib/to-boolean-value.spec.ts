import { describe, expect, it } from 'vitest'

import { toBooleanValue } from './to-boolean-value'

describe('toBooleanValue', () => {
  it('handles truthy booleanish literals', () => {
    expect(toBooleanValue(true)).toBe(true)
    expect(toBooleanValue('true')).toBe(true)
    expect(toBooleanValue('on')).toBe(true)
    /** @ts-expect-error TS2345 */
    expect(toBooleanValue('TrUe')).toBe(true)
  })

  it('handles false-y booleanish literals and booleans', () => {
    expect(toBooleanValue(false)).toBe(false)
    expect(toBooleanValue('false')).toBe(false)
    expect(toBooleanValue('off')).toBe(false)
    /** @ts-expect-error TS2345 */
    expect(toBooleanValue('OFF')).toBe(false)
  })

  it('returns false for nullish values', () => {
    expect(toBooleanValue(null)).toBe(false)
    expect(toBooleanValue(undefined)).toBe(false)
  })

  it('returns false for unrecognized strings without throwing', () => {
    /** @ts-expect-error TS2345 */
    expect(toBooleanValue('maybe')).toBe(false)
  })
})
