import { describe, expect, it } from 'vitest'

import type { CustomizerConfig } from './config'

import {
  BASE_COLOR_NAMES,
  DEFAULT_CONFIG,
  getThemesForBaseColor,
  RADII,
  THEME_NAMES,
} from './config'
import {
  decodePreset,
  encodePreset,
  fromBase62,
  generateRandomConfig,
  generateRandomPreset,
  isPresetCode,
  isValidPreset,
  toBase62,
} from './preset'

const RADIUS_NAMES = RADII.map(radius => radius.name)

describe('preset encode/decode', () => {
  it('round-trips every base color / theme / radius combination', () => {
    for (const baseColor of BASE_COLOR_NAMES) {
      for (const theme of THEME_NAMES) {
        for (const radius of RADIUS_NAMES) {
          const config = { baseColor, theme, radius }
          expect(decodePreset(encodePreset(config))).toEqual(config)
        }
      }
    }
  })

  it('encodes the all-defaults config to "a0"', () => {
    expect(encodePreset(DEFAULT_CONFIG)).toBe('a0')
  })

  it('fills missing fields from DEFAULT_CONFIG', () => {
    expect(encodePreset({ theme: 'blue' })).toBe(
      encodePreset({ ...DEFAULT_CONFIG, theme: 'blue' }),
    )
  })

  it('produces short codes (<= 10 chars, "a" version prefix)', () => {
    for (const baseColor of BASE_COLOR_NAMES) {
      for (const theme of THEME_NAMES) {
        for (const radius of RADIUS_NAMES) {
          const code = encodePreset({ baseColor, theme, radius })
          expect(code.length).toBeLessThanOrEqual(10)
          expect(code[0]).toBe('a')
        }
      }
    }
  })
})

describe('decodePreset guards', () => {
  it('returns null for empty or too-short input', () => {
    expect(decodePreset('')).toBeNull()
    expect(decodePreset('a')).toBeNull()
  })

  it('returns null for an unknown version prefix', () => {
    expect(decodePreset('z0')).toBeNull()
  })

  it('returns null for a non-base62 payload', () => {
    expect(decodePreset('a$$')).toBeNull()
  })

  it('clamps a representable-but-out-of-range index to index 0', () => {
    // Theme field is 5 bits (offset 3). THEME_NAMES.length (21) is a valid
    // 5-bit value but has no matching entry, so it must clamp to index 0.
    const outOfRangeThemeIdx = THEME_NAMES.length
    const bits = outOfRangeThemeIdx * 2 ** 3
    const decoded = decodePreset(`a${toBase62(bits)}`)

    expect(decoded).not.toBeNull()
    expect(decoded!.theme).toBe(THEME_NAMES[0])
  })
})

describe('isPresetCode', () => {
  it('accepts codes produced by encodePreset', () => {
    expect(isPresetCode(encodePreset(DEFAULT_CONFIG))).toBe(true)
    expect(isPresetCode(encodePreset({ theme: 'rose', radius: 'large' }))).toBe(
      true,
    )
  })

  it('rejects junk', () => {
    expect(isPresetCode('')).toBe(false)
    expect(isPresetCode('a')).toBe(false)
    expect(isPresetCode('a$')).toBe(false)
    expect(isPresetCode('z0')).toBe(false)
    expect(isPresetCode('a0000000000')).toBe(false)
  })
})

describe('base62', () => {
  it('round-trips integers', () => {
    for (const n of [0, 1, 61, 62, 200, 2047, 999999]) {
      expect(fromBase62(toBase62(n))).toBe(n)
    }
  })
})

describe('generateRandomConfig', () => {
  it('always yields a valid, encodable, decodable config', () => {
    for (let i = 0; i < 200; i++) {
      const config = generateRandomConfig()
      expect(BASE_COLOR_NAMES).toContain(config.baseColor)
      expect(THEME_NAMES).toContain(config.theme)
      expect(RADIUS_NAMES).toContain(config.radius)
      expect(decodePreset(encodePreset(config))).toEqual(config)
      expect(isValidPreset(generateRandomPreset())).toBe(true)
    }
  })

  it('only picks themes valid for the chosen base color', () => {
    for (let i = 0; i < 200; i++) {
      const { baseColor, theme } = generateRandomConfig()
      expect(getThemesForBaseColor(baseColor)).toContain(theme)
    }
  })
})

/*
  Golden vectors freeze the v1 layout AND the value-array index order. A
  symmetric round-trip stays green if someone reorders THEME_NAMES /
  BASE_COLOR_NAMES / RADII or changes a field's bits/offset, but these literal
  code <-> config pairs break immediately. Never edit a vector to make it pass:
  a change here means previously shared codes broke, which requires a NEW preset
  version, not a mutation of the v1 layout.
*/
describe('golden vectors (frozen v1 contract)', () => {
  const GOLDEN: [string, CustomizerConfig][] = [
    ['a0', { baseColor: 'neutral', theme: 'neutral', radius: 'default' }],
    ['a8G', { baseColor: 'zinc', theme: 'neutral', radius: 'default' }],
    ['aW', { baseColor: 'neutral', theme: 'amber', radius: 'default' }],
    ['aEW', { baseColor: 'gray', theme: 'rose', radius: 'large' }],
    ['a4p', { baseColor: 'stone', theme: 'blue', radius: 'medium' }],
    ['aEz', { baseColor: 'gray', theme: 'yellow', radius: 'none' }],
  ]

  it.each(GOLDEN)('decodes %s to its frozen config', (code, config) => {
    expect(decodePreset(code)).toEqual(config)
  })

  it.each(GOLDEN)('encodes the config for %s to that code', (code, config) => {
    expect(encodePreset(config)).toBe(code)
  })
})
