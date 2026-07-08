import { betterTailwindcssPlugin, defineConfig, tailwind, typescript, vue } from '@acfatah/eslint-preset'
import pluginVitest from '@vitest/eslint-plugin'
import storybook from 'eslint-plugin-storybook'

export default defineConfig(
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

  typescript,
  vue,
  tailwind,

  {
    plugins: {
      ...betterTailwindcssPlugin,
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

  // Story-shape enforcement (PLAN section 9): the storybook/* recommended rules
  // scoped to story files, plus the uninstalled-addons guard on main.ts. Only
  // the storybook/* rules are enabled (the recommended config also ships
  // react-hooks/import-x rules whose plugins this Vue project does not load).
  {
    name: 'storybook/stories',
    files: ['stories/**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    plugins: { storybook },
    rules: {
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'warn',
      'storybook/no-redundant-story-name': 'warn',
      'storybook/no-renderer-packages': 'error',
      'storybook/prefer-pascal-case': 'warn',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
    },
  },

  {
    name: 'storybook/main',
    files: ['.storybook/main.@(js|cjs|mjs|ts)'],
    plugins: { storybook },
    rules: {
      'storybook/no-uninstalled-addons': 'error',
    },
  },
)
