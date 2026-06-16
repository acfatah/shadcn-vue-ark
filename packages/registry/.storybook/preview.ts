import type { Preview } from '@storybook/vue3-vite'

import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'

import './global.css'
import { tailwindViewports } from '../stories/tailwind-viewports'

const pinia = createPinia()

setup((app) => {
  app.use(pinia)
})

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
    viewport: { value: 'lg', isRotated: false },
  },

  parameters: {
    backgrounds: { disable: true },
    viewport: { options: tailwindViewports },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    themes: {
      target: 'html',
    },

    docs: {
      codePanel: true,
    },

    a11y: {
      // Ark overlays (dialog, combobox listbox, tooltip) Teleport outside
      // the story root, so scope axe at the document body.
      context: 'body',

      // 'off' | 'todo' | 'error'. Global default 'todo' reports violations
      // without failing CI; promote a clean component's meta to 'error'.
      test: 'todo',
    },
  },

  argTypes: {
    key: { table: { disable: true } },
    ref: { table: { disable: true } },
    ref_for: { table: { disable: true } },
    ref_key: { table: { disable: true } },
    style: { table: { disable: true } },
  },

  decorators: [
    // Decorator to apply bg-color to stories in dark mode
    (_story, context) => {
      let { theme } = context.globals

      // In docs mode, stories render in nested iframes that don't receive
      // toolbar globals. Read the actual globals from the top-level URL.
      if (window.parent !== window) {
        try {
          const params = new URL(window.top!.location.href).searchParams
          const globalsParam = params.get('globals')
          if (globalsParam) {
            for (const pair of globalsParam.split(';')) {
              const [key, value] = pair.split(':')
              if (key === 'theme')
                theme = value
            }
          }
        }
        catch { /* cross-origin */ }
      }

      const isDark = theme === 'dark'

      document.documentElement.classList.toggle('dark', isDark)
      document.body.classList.add('bg-background', 'text-foreground')

      // Inline docs rendering: story containers sit behind opaque
      // Storybook wrappers so the body background is hidden.
      document.querySelectorAll<HTMLElement>('.docs-story').forEach((el) => {
        el.classList.add('bg-background', 'text-foreground')
      })

      return { template: `<story/>` }
    },
  ],
}

export default preview
