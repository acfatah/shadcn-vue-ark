import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

/*
  Vite config consumed by the Storybook builder (@storybook/vue3-vite). The
  registry build CLI and Vitest use their own entry points and do not rely on
  this file.
*/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'packages.registry': path.resolve(__dirname, './src'),
    },
  },
})
