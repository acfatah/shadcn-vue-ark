import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    formatters: true,
    astro: true,
    vue: true,
  },

  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },

    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      'better-tailwindcss/no-restricted-classes': 'off',
      'better-tailwindcss/no-unregistered-classes': 'off',

      // https://perfectionist.dev/rules/sort-imports.html
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],

      // https://eslint.style/rules/space-before-function-paren
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
        // catch: 'never',
      }],

      // https://eslint.style/rules/padding-line-between-statements
      'style/padding-line-between-statements': [
        'error',
        // require blank line before all return statements
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
      }],
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/registry/styles/global.css',
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
      '**/tsconfig.*',
    ],
  },

  {
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
)
