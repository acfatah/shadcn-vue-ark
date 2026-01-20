// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import {
  betterTailwindcssPlugin,
  defineConfig,
  preset,
  tailwind,
  vue,
} from '@acfatah/eslint-preset'
import storybook from 'eslint-plugin-storybook'

export default defineConfig(
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
