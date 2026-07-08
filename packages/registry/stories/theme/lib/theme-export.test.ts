import { describe, expect, it } from 'vitest'

import { buildRegistryThemeItem, buildThemeCss, toCssRule } from './theme-export'

describe('toCssRule', () => {
  it('prefixes -- and skips empty values', () => {
    expect(toCssRule(':root', { primary: 'red', radius: '' })).toBe(
      ':root {\n  --primary: red;\n}',
    )
  })

  it('returns an empty string when nothing to emit', () => {
    expect(toCssRule(':root', { radius: '' })).toBe('')
  })
})

describe('buildThemeCss', () => {
  it('emits :root and .dark blocks with -- prefixed vars', () => {
    const css = buildThemeCss({
      baseColor: 'neutral',
      theme: 'blue',
      radius: 'large',
    })

    expect(css).toContain(':root {')
    expect(css).toContain('.dark {')
    // blue accent light primary, overriding the neutral base.
    expect(css).toContain('--primary: oklch(0.488 0.243 264.376);')
    expect(css).toContain('--radius: 0.875rem;')
  })
})

describe('buildRegistryThemeItem', () => {
  it('builds a registry:theme item with light/dark cssVars', () => {
    const item = buildRegistryThemeItem({
      baseColor: 'zinc',
      theme: 'emerald',
      radius: 'default',
    })

    expect(item.type).toBe('registry:theme')
    expect(item.name).toBe('zinc-emerald')
    expect(item.cssVars.light.primary).toBeTruthy()
    expect(item.cssVars.dark.primary).toBeTruthy()
    // Keys are unprefixed (match themes.ts / the shadcn schema).
    const hasPrefixed = Object.keys(item.cssVars.light).some(k =>
      k.startsWith('--'),
    )
    expect(hasPrefixed).toBe(false)
  })
})
