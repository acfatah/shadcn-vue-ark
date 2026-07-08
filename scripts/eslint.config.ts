/**
 * ESLint configuration for scripts.
 */

import { defineConfig, typescript } from '@acfatah/eslint-preset'

export default defineConfig(
  {
    formatters: true,
    type: 'lib',

    ignores: [
      '**/tsconfig.*',
    ],
  },

  typescript,

  {
    rules: {
      'no-console': 'off',
    },
  },
)
