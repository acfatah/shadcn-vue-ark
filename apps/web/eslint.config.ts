import {
  betterTailwindcssPlugin,
  defineConfig,
  tailwind,
  typescript,
  vue,
} from '@acfatah/eslint-preset'

export default defineConfig(
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

  typescript,
  vue,
  tailwind,

  {
    plugins: {
      ...betterTailwindcssPlugin,
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
)
