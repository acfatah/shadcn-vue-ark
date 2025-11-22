import type { Preview } from '@storybook/vue3-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'

import '../app/src/styles/global.css'

const pinia = createPinia()

setup((app) => {
  app.use(pinia)
})

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    themes: {
      target: 'html',
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },

      defaultTheme: 'light',
    }),

    // Decorator to apply bg-color to stories in dark mode
    (_story, context) => {
      const body = document.querySelector('body')
      const stories = document.querySelectorAll('.docs-story')
      const THEME_CLASS = 'bg-background'

      if (context.viewMode === 'story') {
        body?.classList.add(THEME_CLASS)
      }
      else {
        body?.classList.remove(THEME_CLASS)
      }

      stories.forEach((element) => {
        element.classList.add(THEME_CLASS)
      })

      return { template: `<story/>` }
    },
  ],
}

export default preview
