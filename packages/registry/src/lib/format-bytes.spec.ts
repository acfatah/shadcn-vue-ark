import { describe, expect, it } from 'vitest'
import { formatBytes } from './format-bytes'

describe('lib: formatBytes', () => {
  describe('zero and small values', () => {
    it('formats 0 bytes as "0 Bytes"', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
    })

    it('formats values less than 1 KB as Bytes', () => {
      expect(formatBytes(1)).toBe('1 Bytes')
      expect(formatBytes(512)).toBe('512 Bytes')
      expect(formatBytes(1023)).toBe('1023 Bytes')
    })
  })

  describe('unit selection using base 1024', () => {
    it('uses 1024 as the step between units', () => {
      expect(formatBytes(1000)).toBe('1000 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
    })

    it('formats exact powers of 1024 with correct units', () => {
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1024 ** 2)).toBe('1 MB')
      expect(formatBytes(1024 ** 3)).toBe('1 GB')
      expect(formatBytes(1024 ** 4)).toBe('1 TB')
      expect(formatBytes(1024 ** 8)).toBe('1 YB')
    })
  })

  describe('decimal handling', () => {
    it('applies the decimals argument when formatting', () => {
      const bytes = 1.5 * 1024

      expect(formatBytes(bytes, 2)).toBe('1.5 KB')
    })

    it('clamps negative decimals to 0 and rounds the value', () => {
      const bytes = 1.5 * 1024

      expect(formatBytes(bytes, -1)).toBe('2 KB')
    })

    it('formats non-boundary values with decimals', () => {
      const bytes = 10 * 1024 ** 2 + 512 * 1024

      expect(formatBytes(bytes, 2)).toBe('10.5 MB')
    })
  })

  describe('error handling', () => {
    it('throws RangeError for negative values', () => {
      expect(() => formatBytes(-1)).toThrow(RangeError)
    })

    it('throws RangeError for NaN', () => {
      expect(() => formatBytes(Number.NaN)).toThrow(RangeError)
    })

    it('throws RangeError for positive infinity', () => {
      expect(() => formatBytes(Number.POSITIVE_INFINITY))
        .toThrow(RangeError)
    })

    it('throws RangeError for negative infinity', () => {
      expect(() => formatBytes(Number.NEGATIVE_INFINITY))
        .toThrow(RangeError)
    })
  })
})
