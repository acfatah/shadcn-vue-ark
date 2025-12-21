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
    astro: true,
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
    },

    rules: {
      ...preset,
      ...tailwind,
      ...vue,
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
)
