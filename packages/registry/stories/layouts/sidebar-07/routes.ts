import SidebarLayout from '@/components/layouts/sidebar-07/SidebarLayout.vue'

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
