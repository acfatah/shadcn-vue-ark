import type { CustomizerConfig } from './config'

import { buildThemeVars } from './build-theme-vars'

export interface RegistryThemeItem {
  name: string
  type: 'registry:theme'
  cssVars: {
    light: Record<string, string>
    dark: Record<string, string>
  }
}

/**
 * Format one CSS rule from a token map. Keys are token names WITHOUT the leading
 * `--` (as stored in themes.ts); the prefix is added here. Empty values are
 * skipped, and an empty rule yields '' so callers can filter it out.
 */
export function toCssRule(
  selector: string,
  tokens: Record<string, string>,
): string {
  const body = Object.entries(tokens)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')

  if (!body)
    return ''

  return `${selector} {\n${body}\n}`
}

/** Build copy-paste CSS: a `:root` (light) block and a `.dark` block. */
export function buildThemeCss(config: CustomizerConfig): string {
  const { light, dark } = buildThemeVars(config)

  return [toCssRule(':root', light), toCssRule('.dark', dark)]
    .filter(Boolean)
    .join('\n\n')
}

/**
 * Build a shadcn `registry:theme` item for the current config. cssVars keys stay
 * unprefixed to match src/themes.ts and the shadcn registry schema.
 */
export function buildRegistryThemeItem(
  config: CustomizerConfig,
): RegistryThemeItem {
  const { light, dark } = buildThemeVars(config)

  return {
    name: `${config.baseColor}-${config.theme}`,
    type: 'registry:theme',
    cssVars: { light, dark },
  }
}
