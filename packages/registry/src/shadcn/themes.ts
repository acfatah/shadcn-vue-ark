import type { Registry } from 'shadcn/schema'

import { baseColors } from './base-colors'

// Create a theme for each color in the base colors.
export const themes: Registry['items'] = Object.keys(baseColors).map(
  (color) => {
    return {
      name: `theme-${color}`,
      type: 'registry:theme',
      cssVars: baseColors[color as keyof typeof baseColors],
    }
  },
)
