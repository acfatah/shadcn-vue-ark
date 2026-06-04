import { betterTailwindcssPlugin, config, preset, tailwind, vue } from '@acfatah/eslint-preset'
import pluginVitest from '@vitest/eslint-plugin'
import storybook from 'eslint-plugin-storybook'

export default config(
  {
    formatters: true,
    vue: true,

    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/public/**',
      '**/storybook-static/**',
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

      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
      }],
    },

    settings: {
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
        variables: [
          ['variant', [{ match: 'objectValues' }]],
          ['size', [{ match: 'objectValues' }]],
        ],
      },
    },
  },

  {
    rules: pluginVitest.configs.recommended.rules,
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
)
