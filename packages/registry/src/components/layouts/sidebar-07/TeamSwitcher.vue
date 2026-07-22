<script setup lang="ts">
import type { VNode } from 'vue'

import { ChevronsUpDownIcon, PlusIcon } from 'lucide-vue-next'
import { ref } from 'vue'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Sidebar } from '@/components/ui/sidebar'

interface Team {
  name: string
  logo: VNode
  plan: string
}

const { teams } = defineProps<{
  teams: Team[]
}>()

const activeTeam = ref(teams[0]!)

function setActiveTeam(team: Team) {
  activeTeam.value = team
}
</script>

<template>
  <Sidebar.Menu>
    <Sidebar.MenuItem>
      <DropdownMenu.Root
        align="start"
        side="bottom"
        :side-offset="4"
        :positioning="{ strategy: 'fixed' }"
      >
        <DropdownMenu.Trigger class="hover:cursor-pointer" as-child>
          <Sidebar.MenuButton
            size="lg"
            class="
              data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
            "
          >
            <div
              class="
                flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary
                text-sidebar-primary-foreground
              "
            >
              <component :is="activeTeam.logo" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm/tight">
              <span class="truncate font-semibold">{{ activeTeam.name }}</span>
              <span class="truncate text-xs">{{ activeTeam.plan }}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto" />
          </Sidebar.MenuButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          class="min-w-56 rounded-lg"
        >
          <DropdownMenu.Group>
            <DropdownMenu.Label class="text-xs text-muted-foreground">
              Teams
            </DropdownMenu.Label>
            <DropdownMenu.Item
              v-for="(team, index) in teams"
              :key="team.name"
              :value="team.name"
              class="gap-2 p-2"
              @click="setActiveTeam(team)"
            >
              <div class="flex size-6 items-center justify-center rounded-sm border">
                <component :is="team.logo" class="size-4 shrink-0" />
              </div>
              {{ team.name }}
              <DropdownMenu.Shortcut>{{ index + 1 }}</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item value="add-team" class="gap-2 p-2">
            <div
              class="flex size-6 items-center justify-center rounded-md border bg-background"
            >
              <PlusIcon class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">
              Add team
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</template>
