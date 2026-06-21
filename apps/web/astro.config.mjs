// @ts-check
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      template: {
        compilerOptions: {
        // ...
        },
      },
    }),

    starlight({
      title: 'shadcn-vue-ark',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/acfatah/shadcn-vue-ark' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Installation', slug: 'guides/installation' },
            { label: 'Components', slug: 'guides/components' },
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
        'packages.registry/': new URL('../../packages/registry/src/', import.meta.url).pathname,
      },
    },
  },
})
