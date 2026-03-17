<script setup lang="ts">
import { Sidebar } from '@/components/ui/sidebar'

import LayoutHeader from './LayoutHeader.vue'
import SidebarLeft from './SidebarLeft.vue'
</script>

<template>
  <Sidebar.Provider>
    <SidebarLeft />
    <Sidebar.Inset>
      <LayoutHeader />
      <RouterView />
    </Sidebar.Inset>
  </Sidebar.Provider>
</template>
