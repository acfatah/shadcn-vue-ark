import type { CustomizerConfig } from './config'

import { getBaseColor, getTheme, RADII } from './config'

export interface ThemeVars {
  light: Record<string, string>
  dark: Record<string, string>
}

/**
 * Merge the selected base color and theme/accent into a single light + dark CSS
 * variable set, applying the radius override. Ported from upstream shadcn-vue
 * `buildRegistryTheme` (apps/v4/registry/config.ts).
 *
 * Keys are token names WITHOUT the leading `--`, matching src/themes.ts. The
 * accent theme overrides the base color's primary/secondary/chart/sidebar-
 * primary tokens; everything else falls through from the base color.
 *
 * Radius is written to the light set only. `--radius` lives in :root (not
 * .dark), so a single declaration cascades to both preview modes.
 */
export function buildThemeVars(config: CustomizerConfig): ThemeVars {
  const baseColor = getBaseColor(config.baseColor)
  const theme = getTheme(config.theme)

  if (!baseColor || !theme) {
    throw new Error(
      `Unknown base color "${config.baseColor}" or theme "${config.theme}"`,
    )
  }

  const baseLight = (baseColor.cssVars?.light ?? {}) as Record<string, string>
  const baseDark = (baseColor.cssVars?.dark ?? {}) as Record<string, string>
  const themeLight = (theme.cssVars?.light ?? {}) as Record<string, string>
  const themeDark = (theme.cssVars?.dark ?? {}) as Record<string, string>

  const light: Record<string, string> = { ...baseLight, ...themeLight }
  const dark: Record<string, string> = { ...baseDark, ...themeDark }

  const radius = RADII.find(r => r.name === config.radius)
  if (radius && radius.value) {
    light.radius = radius.value
  }

  return { light, dark }
}
