// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

// https://github.com/eslint/markdown
import markdown from '@eslint/markdown'

/**
 * Merge rules from the markdown plugin recommended config
 */
function markdownRecommendedRules() {
  const recommended = (markdown as any).configs?.recommended
  if (Array.isArray(recommended)) {
    return recommended.reduce((acc: Record<string, any>, cfg: any) => {
      return { ...acc, ...(cfg?.rules || {}) }
    }, {})
  }

  return (recommended?.rules) || {}
}

export default antfu(
  {
    formatters: true,
    vue: true,
  },

  {
    plugins: {
      // https://github.com/schoero/eslint-plugin-better-tailwindcss
      'better-tailwindcss': eslintPluginBetterTailwindcss,

      storybook,
    },

    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn']?.rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error']?.rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      'better-tailwindcss/no-restricted-classes': 'off',
      'better-tailwindcss/no-unregistered-classes': 'off',

      // https://perfectionist.dev/rules/sort-imports.html
      'sort-imports': 'off',
      'perfectionist/sort-imports': ['error', {
        partitionByNewLine: true,
        newlinesBetween: 'ignore',
      }],

      // https://eslint.style/rules/space-before-function-paren
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
        // catch: 'never',
      }],

      // https://eslint.style/rules/padding-line-between-statements
      'style/padding-line-between-statements': ['error',
        // require blank line before all return statements
        { blankLine: 'always', prev: '*', next: 'return' }],

      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
      }],

      ...markdownRecommendedRules(),
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'logs',
      'tsconfig.*',
    ],
  },
)
