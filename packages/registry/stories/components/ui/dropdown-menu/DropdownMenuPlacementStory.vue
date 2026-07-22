<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

interface Props {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  side: 'left',
  sideOffset: 4,
})
</script>

<template>
  <div class="flex min-h-[50vh] w-full justify-end">
    <DropdownMenu.Root
      :align="align"
      :align-offset="alignOffset"
      :side="side"
      :side-offset="sideOffset"
    >
      <DropdownMenu.Trigger as-child>
        <Button variant="outline" class="m-auto">
          Open
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56">
        <DropdownMenu.Group>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Item value="profile">
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item value="settings">
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item value="logout">
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</template>
