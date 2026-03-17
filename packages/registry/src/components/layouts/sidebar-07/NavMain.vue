<script setup lang="ts">
import type { VNode } from 'vue'

import { ChevronRightIcon } from 'lucide-vue-next'

import { Collapsible } from '@/components/ui/collapsible'
import { Sidebar } from '@/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: VNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <Sidebar.Group>
    <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
    <Sidebar.Menu>
      <Collapsible.Root
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <Sidebar.MenuItem>
          <Collapsible.Trigger as-child>
            <Sidebar.MenuButton :tooltip="item.title" class="hover:cursor-pointer">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRightIcon
                class="
                  ml-auto transition-transform duration-200
                  group-data-[state=open]/collapsible:rotate-90
                "
              />
            </Sidebar.MenuButton>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Sidebar.MenuSub>
              <Sidebar.MenuSubItem
                v-for="subItem in item.items"
                :key="subItem.title"
              >
                <Sidebar.MenuSubButton as-child>
                  <a :href="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </a>
                </Sidebar.MenuSubButton>
              </Sidebar.MenuSubItem>
            </Sidebar.MenuSub>
          </Collapsible.Content>
        </Sidebar.MenuItem>
      </Collapsible.Root>
    </Sidebar.Menu>
  </Sidebar.Group>
</template>
