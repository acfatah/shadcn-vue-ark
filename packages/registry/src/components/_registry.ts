import type { RegistryItem } from 'shadcn/schema'

export const componentsRegistry: Partial<RegistryItem>[] = [
  {
    name: 'dark-mode-toggle',
    title: 'Dark Mode Toggle',
    description: 'A button to toggle between light and dark mode.',
    files: [
      {
        type: 'registry:file',
        path: 'src/components/DarkModeToggle.vue',
        target: 'src/components/DarkModeToggle.vue',
      },
    ],
  },

  {
    name: 'fullscreen-toggle',
    title: 'Fullscreen Toggle',
    description: 'A button to toggle fullscreen mode for the application.',
    files: [
      {
        type: 'registry:file',
        path: 'src/components/FullscreenToggle.vue',
        target: 'src/components/FullscreenToggle.vue',
      },
    ],
  },
]
