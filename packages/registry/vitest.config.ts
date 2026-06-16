import type { PluginOption } from 'vite'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

/*
  Two Vitest projects:
   - unit:      existing happy-dom unit tests under src/ (and stories/__checks__).
   - storybook: every *.stories.ts run as a browser test (render + play + a11y)
                via @storybook/addon-vitest. It inherits Vue, Tailwind, and the
                @/packages.registry aliases from the Storybook builder pipeline
                (.storybook + vite.config.ts), so they are NOT redeclared here.
*/
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          vue() as PluginOption,
          tailwindcss() as PluginOption,
        ],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
        test: {
          name: 'unit',
          globals: true,
          environment: 'happy-dom',
          include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
          exclude: ['**/node_modules/**', '**/*.stories.*'],
        },
      },
      {
        // Inherit the Storybook builder's Vite config (Vue, Tailwind,
        // svgLoader, and the @ / packages.registry aliases) so story .vue
        // files transform and resolve exactly as they do in Storybook.
        extends: './vite.config.ts',
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
          }) as PluginOption,
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
