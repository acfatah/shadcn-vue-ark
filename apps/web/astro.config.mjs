// @ts-check
import { defineConfig } from 'astro/config'

import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

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
      title: 'Bun Ark Vue',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
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
