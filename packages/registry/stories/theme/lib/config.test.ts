import { describe, expect, it } from 'vitest'

import {
  BASE_COLOR_NAMES,
  getThemesForBaseColor,
  resolveTheme,
  THEME_NAMES,
} from './config'

describe('getThemesForBaseColor', () => {
  it('includes the base color and all accents, excludes other base colors', () => {
    const themes = getThemesForBaseColor('neutral')

    expect(themes).toContain('neutral')
    expect(themes).toContain('blue')
    expect(themes).not.toContain('stone')
    expect(themes).not.toContain('zinc')
    expect(themes).not.toContain('gray')
    // 1 (the base color itself) + every accent theme.
    expect(themes).toHaveLength(
      THEME_NAMES.length - BASE_COLOR_NAMES.length + 1,
    )
  })
})

describe('resolveTheme', () => {
  it('keeps an accent theme valid across all base colors', () => {
    expect(resolveTheme('stone', 'blue')).toBe('blue')
    expect(resolveTheme('zinc', 'rose')).toBe('rose')
  })

  it('keeps the base color used as its own theme', () => {
    expect(resolveTheme('zinc', 'zinc')).toBe('zinc')
  })

  it('resets a theme that equals a different base color', () => {
    expect(resolveTheme('stone', 'zinc')).toBe('stone')
    expect(resolveTheme('neutral', 'gray')).toBe('neutral')
  })
})
