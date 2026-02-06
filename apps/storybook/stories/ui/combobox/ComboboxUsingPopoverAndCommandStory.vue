<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Command } from '@/components/ui/command'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

const open = ref(false)
const value = ref('')

const selectedFramework = computed(() =>
  frameworks.find(framework => framework.value === value.value),
)

function selectFramework(selectedValue: string) {
  value.value = selectedValue === value.value ? '' : selectedValue
  open.value = false
}

function handleSelect(
  ev: Event | { detail: { value: string } },
) {
  if ('detail' in ev) {
    selectFramework(ev.detail.value)
  }
}
</script>

<template>
  <Popover.Root v-model:open="open">
    <Popover.Trigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ selectedFramework?.label || "Select framework..." }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
      <Command.Root class="w-full">
        <Command.Input class="h-9" placeholder="Search framework..." />
        <Command.List>
          <Command.Empty>No framework found.</Command.Empty>
          <Command.Group>
            <Command.Item
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="handleSelect"
            >
              {{ framework.label }}
              <CheckIcon
                :class="cn(
                  'ml-auto',
                  value === framework.value ? 'opacity-100' : 'opacity-0',
                )"
              />
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
</template>
