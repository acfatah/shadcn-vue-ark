import { config, preset } from '@acfatah/eslint-preset'

export default config(
  {
    formatters: true,

    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/tsconfig.*',
      'bun.lock',
      'logs',
    ],
  },

  {
    rules: {
      'no-console': 'off',
      ...preset,
    },
  },
)
