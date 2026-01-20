import type { ThemeName } from 'packages.registry/shadcn/base-colors.ts'
import type { InjectionKey, Ref } from 'vue'

import { useLocalStorage } from '@vueuse/core'
import { inject, provide, ref, watchEffect } from 'vue'

const DEFAULT_THEME = 'blue'

interface ThemeContextState {
  activeTheme: Ref<ThemeName>
  setActiveTheme: (theme: ThemeName) => void
}

const ThemeContextKey: InjectionKey<ThemeContextState> = Symbol('ThemeContext')

export function applyTheme(theme: ThemeName) {
  const body = document.body

  Array.from(body.classList)
    .filter(className => className.startsWith('theme-'))
    .forEach((className) => {
      body.classList.remove(className)
    })

  body.classList.add(`theme-${theme}`)
  if (theme.endsWith('-scaled')) {
    body.classList.add('theme-scaled')
  }
}

export function useThemeConfig() {
  const savedTheme = useLocalStorage('active-theme', DEFAULT_THEME)
  const activeTheme = ref<ThemeName>(savedTheme.value as ThemeName)

  watchEffect(() => {
    activeTheme.value = savedTheme.value as ThemeName
    applyTheme(activeTheme.value)
  })

  const setActiveTheme = (newTheme: ThemeName) => {
    activeTheme.value = newTheme
    savedTheme.value = newTheme
  }

  provide(ThemeContextKey, { activeTheme, setActiveTheme })

  return { activeTheme, setActiveTheme }
}

export function injectTheme() {
  const context = inject<ThemeContextState>(ThemeContextKey)
  if (!context) {
    throw new Error('useThemeConfig must be used within a component that calls provideTheme')
  }

  return context
}
