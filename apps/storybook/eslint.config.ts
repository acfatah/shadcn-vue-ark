// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import {
  betterTailwindcssPlugin,
  config,
  preset,
  tailwind,
  vue,
} from '@acfatah/eslint-preset'

export default config(
  {
    formatters: true,
    vue: true,

    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/tsconfig.*',
      'logs',
    ],
  },

  {
    plugins: {
      ...betterTailwindcssPlugin,
      storybook,
    },

    rules: {
      ...preset,
      ...tailwind,
      ...vue,
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: '../../packages/registry/src/styles/global.css',
      },
    },
  },
)
