<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-vue-next'
import { ref } from 'vue'

import { Command } from '@/components/ui/command'

const open = ref(false)

const { meta_j } = useMagicKeys()

whenever(() => meta_j?.value, () => {
  open.value = true
})
</script>

<template>
  <Command.Root
    class="
      rounded-lg border shadow-md
      md:min-w-[450px]
    "
  >
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Suggestions">
        <Command.Item value="calendar">
          <Calendar />
          <span>Calendar</span>
        </Command.Item>
        <Command.Item value="emoji">
          <Smile />
          <span>Search Emoji</span>
        </Command.Item>
        <Command.Item disabled value="calculator">
          <Calculator />
          <span>Calculator</span>
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item value="profile">
          <User />
          <span>Profile</span>
          <Command.Shortcut>⌘P</Command.Shortcut>
        </Command.Item>
        <Command.Item value="billing">
          <CreditCard />
          <span>Billing</span>
          <Command.Shortcut>⌘B</Command.Shortcut>
        </Command.Item>
        <Command.Item value="settings">
          <Settings />
          <span>Settings</span>
          <Command.Shortcut>⌘S</Command.Shortcut>
        </Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Root>
</template>
