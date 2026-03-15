<script setup lang="ts">
import { Sidebar } from '@/components/ui/sidebar'

import { data } from './data'
import NavMain from './NavMain.vue'
import NavProjects from './NavProjects.vue'
import NavUser from './NavUser.vue'
import TeamSwitcher from './TeamSwitcher.vue'
</script>

<template>
  <Sidebar.Root collapsible="icon">
    <Sidebar.Header>
      <TeamSwitcher :teams="data.teams" />
    </Sidebar.Header>
    <Sidebar.Content>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </Sidebar.Content>
    <Sidebar.Footer>
      <NavUser :user="data.user" />
    </Sidebar.Footer>
    <Sidebar.Rail />
  </Sidebar.Root>
</template>
