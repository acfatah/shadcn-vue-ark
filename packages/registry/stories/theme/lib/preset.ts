import type { CustomizerConfig } from './config'

import {
  BASE_COLOR_NAMES,
  DEFAULT_CONFIG,
  getThemesForBaseColor,
  RADII,
  THEME_NAMES,
} from './config'

/*
  Preset encoding / decoding.

  Bit-packs the customizer config into a single integer, base62-encodes it, and
  prefixes a version char. Ported from shadcn-vue
  (packages/cli/src/preset/preset.ts). Browser-safe: no Node.js dependencies.
  Uses multiplication (not bitwise ops) because JS bitwise truncates to 32 bits.

  Versioning contract (this is load-bearing for shared codes):
    - encodePreset always writes CURRENT_VERSION's layout.
    - decodePreset dispatches on the code's version char and decodes with the
      SAME layout it was encoded under (PRESET_LAYOUTS[version]). So a code
      shared today keeps decoding to the same config forever.
    - A layout is FROZEN once shipped. Never reorder its fields, change a
      field's `bits`, or insert a field mid-list. To evolve, add a NEW version
      key (e.g. "b" -> PRESET_FIELDS_V2) and point CURRENT_VERSION at it; leave
      older layouts untouched.
    - Appending a VALUE to a field's array (config.ts) is safe within a version
      ONLY while the array length stays within that field's capacity of
      2**bits. v1 caps: radius <= 8, theme <= 32, baseColor <= 8. Exceeding a
      cap means widening `bits`, which requires a new version layout.
    - Total bits per layout must stay under 53 (JS safe-integer limit); v1 uses
      11 bits, so there is ample room.
*/

interface PresetField {
  readonly key: keyof CustomizerConfig
  readonly values: readonly string[]
  readonly bits: number
}

const RADIUS_NAMES = RADII.map(radius => radius.name)

// Field layout for version "a" (v1): 3 + 5 + 3 = 11 bits. FROZEN once shipped.
const PRESET_FIELDS_V1: readonly PresetField[] = [
  { key: 'radius', values: RADIUS_NAMES, bits: 3 },
  { key: 'theme', values: THEME_NAMES, bits: 5 },
  { key: 'baseColor', values: BASE_COLOR_NAMES, bits: 3 },
]

// Version char -> frozen field layout. Append new versions here; never mutate
// an existing one (see the versioning contract above).
const PRESET_LAYOUTS: Record<string, readonly PresetField[]> = {
  a: PRESET_FIELDS_V1,
}

const CURRENT_VERSION = 'a'

const BASE62
  = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function toBase62(num: number): string {
  if (num === 0)
    return '0'

  let result = ''
  let n = num
  while (n > 0) {
    result = BASE62[n % 62] + result
    n = Math.floor(n / 62)
  }

  return result
}

export function fromBase62(str: string): number {
  let result = 0
  for (const char of str) {
    const idx = BASE62.indexOf(char)
    if (idx === -1)
      return -1

    result = result * 62 + idx
  }

  return result
}

/** Encode a customizer config into a short alphanumeric preset code. */
export function encodePreset(config: Partial<CustomizerConfig>): string {
  const merged = { ...DEFAULT_CONFIG, ...config }
  const fields = PRESET_LAYOUTS[CURRENT_VERSION]!

  let bits = 0
  let offset = 0
  for (const field of fields) {
    const idx = field.values.indexOf(merged[field.key])
    bits += (idx === -1 ? 0 : idx) * 2 ** offset
    offset += field.bits
  }

  return CURRENT_VERSION + toBase62(bits)
}

/** Decode a preset code back into a customizer config, or null if invalid. */
export function decodePreset(code: string): CustomizerConfig | null {
  if (!code || code.length < 2)
    return null

  const version = code[0]!
  if (!(version in PRESET_LAYOUTS))
    return null

  const fields = PRESET_LAYOUTS[version]!
  const bits = fromBase62(code.slice(1))
  if (bits < 0)
    return null

  const result = {} as Record<string, string>
  let offset = 0
  for (const field of fields) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits
    result[field.key]
      = idx < field.values.length ? field.values[idx]! : field.values[0]!
    offset += field.bits
  }

  return result as unknown as CustomizerConfig
}

/** Cheap shape check: known version char + base62 payload, at most 10 chars. */
export function isPresetCode(value: string): boolean {
  if (!value || value.length < 2 || value.length > 10)
    return false

  if (!(value[0]! in PRESET_LAYOUTS))
    return false

  for (let i = 1; i < value.length; i++) {
    if (!BASE62.includes(value[i]!))
      return false
  }

  return true
}

/** Validate that a preset code decodes successfully. */
export function isValidPreset(code: string): boolean {
  return decodePreset(code) !== null
}

/**
 * Generate a random config. The theme is constrained to those valid for the
 * chosen base color, so a shuffled config is always a legal picker selection.
 */
export function generateRandomConfig(): CustomizerConfig {
  const pick = <T>(arr: readonly T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]!

  const baseColor = pick(BASE_COLOR_NAMES)
  const theme = pick(getThemesForBaseColor(baseColor))
  const radius = pick(RADIUS_NAMES)

  return { baseColor, theme, radius }
}

/** Generate a random preset code. */
export function generateRandomPreset(): string {
  return encodePreset(generateRandomConfig())
}
