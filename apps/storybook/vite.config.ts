import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  root: './app',

  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../packages/registry/src'),
      'packages.registry': path.resolve(__dirname, '../../packages/registry/src'),
    },
  },
})
