<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

interface Props {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'left',
})
</script>

<template>
  <div class="flex min-h-[50vh] w-full justify-end">
    <DropdownMenu.Root :align="align" :side="side">
      <DropdownMenu.Trigger as-child>
        <Button variant="outline" class="m-auto">
          Open Left
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
