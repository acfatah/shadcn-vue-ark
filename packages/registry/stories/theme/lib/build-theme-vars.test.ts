import { describe, expect, it } from 'vitest'

import { BASE_COLORS } from '@/base-colors'
import { THEMES } from '@/themes'

import { buildThemeVars } from './build-theme-vars'
import { BASE_COLOR_NAMES, THEME_NAMES } from './config'

describe('config data parity', () => {
  it('keeps BASE_COLOR_NAMES in sync with the base-colors.ts data set', () => {
    expect([...BASE_COLOR_NAMES].sort()).toEqual(
      BASE_COLORS.map(color => color.name).sort(),
    )
  })

  it('keeps THEME_NAMES in sync with the themes.ts data set', () => {
    expect([...THEME_NAMES].sort()).toEqual(
      THEMES.map(theme => theme.name).sort(),
    )
  })
})

describe('buildThemeVars', () => {
  it('merges base-color surface tokens with accent overrides', () => {
    const { light } = buildThemeVars({
      baseColor: 'neutral',
      theme: 'blue',
      radius: 'default',
    })

    // background comes from the neutral base color...
    expect(light.background).toBe('oklch(1 0 0)')
    // ...primary is overridden by the blue accent.
    expect(light.primary).toBe('oklch(0.488 0.243 264.376)')
  })

  it('keeps the base radius when radius is "default"', () => {
    const { light } = buildThemeVars({
      baseColor: 'neutral',
      theme: 'neutral',
      radius: 'default',
    })

    expect(light.radius).toBe('0.625rem')
  })

  it('overrides radius for a non-default choice', () => {
    const { light } = buildThemeVars({
      baseColor: 'neutral',
      theme: 'neutral',
      radius: 'large',
    })

    expect(light.radius).toBe('0.875rem')
  })

  it('applies radius "none" as "0" (the falsy-adjacent string case)', () => {
    const { light } = buildThemeVars({
      baseColor: 'neutral',
      theme: 'neutral',
      radius: 'none',
    })

    expect(light.radius).toBe('0')
  })

  it('provides both light and dark var sets', () => {
    const { light, dark } = buildThemeVars({
      baseColor: 'zinc',
      theme: 'emerald',
      radius: 'small',
    })

    expect(Object.keys(light).length).toBeGreaterThan(10)
    expect(Object.keys(dark).length).toBeGreaterThan(10)
  })

  it('throws on an unknown theme', () => {
    expect(() =>
      buildThemeVars({
        baseColor: 'neutral',
        // @ts-expect-error intentionally invalid theme name
        theme: 'not-a-theme',
        radius: 'default',
      })).toThrow()
  })
})
