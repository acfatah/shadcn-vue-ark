<script setup lang="ts">
import type { VNode } from 'vue'

import {
  EllipsisIcon,
  FolderIcon,
  ForwardIcon,
  Trash2Icon,
} from 'lucide-vue-next'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Sidebar } from '@/components/ui/sidebar'

defineProps<{
  projects: {
    name: string
    url: string
    icon: VNode
  }[]
}>()
</script>

<template>
  <Sidebar.Group class="group-data-[collapsible=icon]:hidden">
    <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
    <Sidebar.Menu>
      <Sidebar.MenuItem
        v-for="item in projects"
        :key="item.name"
      >
        <Sidebar.MenuButton as-child>
          <a :href="item.url">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </a>
        </Sidebar.MenuButton>
        <DropdownMenu.Root side="bottom" align="start" :positioning="{ strategy: 'fixed' }">
          <DropdownMenu.Trigger as-child>
            <Sidebar.MenuAction show-on-hover class="hover:cursor-pointer">
              <EllipsisIcon />
              <span class="sr-only">More</span>
            </Sidebar.MenuAction>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-48 rounded-lg">
            <DropdownMenu.Item value="view-project">
              <FolderIcon class="text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item value="share-project">
              <ForwardIcon class="text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item value="delete-project">
              <Trash2Icon class="text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="text-sidebar-foreground/70">
          <EllipsisIcon class="text-sidebar-foreground/70" />
          <span>More</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Group>
</template>
