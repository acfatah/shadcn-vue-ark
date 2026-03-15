import SidebarLayout from '@/layouts/sidebar-07/SidebarLayout.vue'

import SampleDashboard from './SampleDashboard.vue'

export default [
  {
    path: '/',
    name: 'dashboard',
    component: SampleDashboard,
    meta: {
      layout: SidebarLayout,
    },
  },
]
