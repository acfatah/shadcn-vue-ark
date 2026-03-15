import type { RegistryItem } from 'shadcn/schema'

import { html } from 'common-tags'

export const registryItem = {
  type: 'registry:file',
  name: 'sidebar-07-layout',
  title: 'Sidebar 07',

  description: html`
    A sidebar layout that collapses to icons with team switcher,
    collapsible navigation, projects list, and user menu.

    References:
    - shadcn/ui: https://ui.shadcn.com/docs/components/sidebar
    - Ark UI: https://ark-ui.com
  `,

  dependencies: [
    'lucide-vue-next',
  ],

  files: [
    {
      path: 'SidebarLayout.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/SidebarLayout.vue',
    },
    {
      path: 'SidebarLeft.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/SidebarLeft.vue',
    },
    {
      path: 'LayoutHeader.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/LayoutHeader.vue',
    },
    {
      path: 'NavMain.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/NavMain.vue',
    },
    {
      path: 'NavProjects.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/NavProjects.vue',
    },
    {
      path: 'NavUser.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/NavUser.vue',
    },
    {
      path: 'TeamSwitcher.vue',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/TeamSwitcher.vue',
    },
    {
      path: 'data.ts',
      type: 'registry:file',
      target: 'src/layouts/sidebar-07/data.ts',
    },
  ],
} satisfies RegistryItem

export default registryItem
