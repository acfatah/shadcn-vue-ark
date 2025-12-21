/**
 * ESLint configuration for scripts.
 */

import { config, preset } from '@acfatah/eslint-preset'

export default config(
  {
    formatters: true,
    type: 'lib',

    ignores: [
      '**/tsconfig.*',
    ],
  },

  {
    rules: {
      'no-console': 'off',
      ...preset,
    },
  },
)
