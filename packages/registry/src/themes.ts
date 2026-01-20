// bunx --bun gitpick shadcn-ui/ui/blob/main/apps/v4/registry/src/themes.ts

import type { Registry } from 'shadcn/schema'

import { baseColors } from './base-colors'

// Create a theme for each color in the base colors.
export const themes: Registry['items'] = Object.keys(baseColors).map(
  (color) => {
    const entry = baseColors[color as keyof typeof baseColors] as any
    const cssVars = entry?.cssVars ?? entry

    return {
      name: `theme-${color}`,
      type: 'registry:theme',
      cssVars: cssVars as {
        theme?: Record<string, string>
        light?: Record<string, string>
        dark?: Record<string, string>
      },
    }
  },
)
