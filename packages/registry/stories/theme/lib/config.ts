import type { RegistryItem } from 'shadcn/schema'

import { BASE_COLORS } from '@/base-colors'
import { THEMES } from '@/themes'

/*
  Option model for the theme customizer (v1: base color + theme + radius).

  The value arrays below are the CONTRACT for preset encoding: their order is
  fixed and append-only. Never reorder or remove entries, or existing preset
  codes will decode to the wrong values. Membership (order-independent) is
  asserted against the live themes.ts / base-colors.ts data in
  build-theme-vars.test.ts, and golden preset vectors in preset.test.ts pin the
  exact index order, so any reorder fails CI. Appends must also stay within each
  field's preset bit capacity (radius <= 8, theme <= 32, baseColor <= 8);
  exceeding a cap requires a new preset version layout (see preset.ts).

  Parity note: the accent themes override only the primary, secondary, chart
  and sidebar-primary tokens, while the base colors carry the full surface token
  set. The repo's extra tokens (surface, selection) are NOT present in
  themes.ts, so in the preview they inherit from the global :root / .dark
  values. Acceptable for v1; revisit if per-base-color surface/selection theming
  is wanted.
*/

// Base color names. Order fixed, append-only.
export const BASE_COLOR_NAMES = ['neutral', 'stone', 'zinc', 'gray'] as const

export type BaseColorName = (typeof BASE_COLOR_NAMES)[number]

// Theme / accent names. Order fixed, append-only. Base colors first, then the
// 17 accent themes.
export const THEME_NAMES = [
  'neutral',
  'stone',
  'zinc',
  'gray',
  'amber',
  'blue',
  'cyan',
  'emerald',
  'fuchsia',
  'green',
  'indigo',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'sky',
  'teal',
  'violet',
  'yellow',
] as const

export type ThemeName = (typeof THEME_NAMES)[number]

// Radius options. `default` keeps the theme's own --radius (0.625rem); the
// others override it. Order fixed, append-only.
export const RADII = [
  { name: 'default', label: 'Default', value: '' },
  { name: 'none', label: 'None', value: '0' },
  { name: 'small', label: 'Small', value: '0.45rem' },
  { name: 'medium', label: 'Medium', value: '0.625rem' },
  { name: 'large', label: 'Large', value: '0.875rem' },
] as const

export type RadiusName = (typeof RADII)[number]['name']

export interface CustomizerConfig {
  baseColor: BaseColorName
  theme: ThemeName
  radius: RadiusName
}

export const DEFAULT_CONFIG: CustomizerConfig = {
  baseColor: 'neutral',
  theme: 'neutral',
  radius: 'default',
}

/**
 * Themes selectable for a given base color: the base color itself plus every
 * accent theme (i.e. exclude the other base colors). Ported from upstream
 * shadcn-vue `getThemesForBaseColor`.
 */
export function getThemesForBaseColor(baseColor: BaseColorName): ThemeName[] {
  return THEME_NAMES.filter((name) => {
    if (name === baseColor)
      return true

    return !(BASE_COLOR_NAMES as readonly string[]).includes(name)
  })
}

/** Look up the full theme registry item (light/dark cssVars) by name. */
export function getTheme(name: string): RegistryItem | undefined {
  return THEMES.find(theme => theme.name === name)
}

/** Look up the full base color registry item by name. */
export function getBaseColor(name: string): RegistryItem | undefined {
  return BASE_COLORS.find(color => color.name === name)
}
