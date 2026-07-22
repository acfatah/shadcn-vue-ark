<script setup lang="ts">
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
} from 'lucide-vue-next'

import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Sidebar } from '@/components/ui/sidebar'

defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()
</script>

<template>
  <Sidebar.Menu>
    <Sidebar.MenuItem>
      <DropdownMenu.Root
        side="bottom"
        align="end"
        :side-offset="4"
        :positioning="{ strategy: 'fixed' }"
      >
        <DropdownMenu.Trigger as-child class="hover:cursor-pointer">
          <Sidebar.MenuButton
            size="lg"
            class="
              data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
            "
          >
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image :src="user.avatar" :alt="user.name" />
              <Avatar.Fallback class="rounded-lg">
                CN
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm/tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto" />
          </Sidebar.MenuButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          class="min-w-56 rounded-lg"
        >
          <DropdownMenu.Group>
            <DropdownMenu.Label class="p-0 font-normal">
              <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar.Root class="size-8 rounded-lg">
                  <Avatar.Image :src="user.avatar" :alt="user.name" />
                  <Avatar.Fallback class="rounded-lg">
                    CN
                  </Avatar.Fallback>
                </Avatar.Root>
                <div class="grid flex-1 text-left text-sm/tight">
                  <span class="truncate font-semibold">{{ user.name }}</span>
                  <span class="truncate text-xs">{{ user.email }}</span>
                </div>
              </div>
            </DropdownMenu.Label>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item value="upgrade">
              <SparklesIcon />
              Upgrade to Pro
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item value="account">
              <BadgeCheckIcon />
              Account
            </DropdownMenu.Item>
            <DropdownMenu.Item value="billing">
              <CreditCardIcon />
              Billing
            </DropdownMenu.Item>
            <DropdownMenu.Item value="notifications">
              <BellIcon />
              Notifications
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item value="logout">
            <LogOutIcon />
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</template>
