<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/combobox'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { Badge } from '@/components/ui/badge'
import { Combobox } from '@/components/ui/combobox'

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

const value = ref<string[]>([])
const inputValue = ref('')

const filteredFrameworks = computed(() => {
  const term = inputValue.value.trim().toLowerCase()

  if (!term)
    return frameworks

  return frameworks.filter(framework =>
    framework.label.toLowerCase().includes(term)
    || framework.value.toLowerCase().includes(term),
  )
})

const collection = computed(() => createListCollection({
  items: filteredFrameworks.value,
}))

const selectedFrameworks = computed(() =>
  frameworks.filter(framework => value.value.includes(framework.value)),
)

function handleInputValueChange(details: { inputValue: string }) {
  inputValue.value = details.inputValue
}

function handleValueChange() {
  inputValue.value = ''
}

function removeValue(val: string, event: Event) {
  event.stopPropagation()
  value.value = value.value.filter(v => v !== val)
}
</script>

<template>
  <Combobox.Root
    v-model="value"
    :input-value="inputValue"
    :collection="(collection as any)"
    multiple
    @input-value-change="handleInputValueChange"
    @value-change="handleValueChange"
  >
    <Combobox.Anchor>
      <Combobox.Trigger as-child>
        <div
          class="
            flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-input
            bg-background px-3 py-1 text-sm shadow-xs
          "
        >
          <Badge
            v-for="framework in selectedFrameworks"
            :key="framework.value"
            variant="secondary"
            class="gap-1"
          >
            {{ framework.label }}
            <XIcon
              class="size-3 cursor-pointer"
              @click="removeValue(framework.value, $event)"
            />
          </Badge>
          <span
            v-if="selectedFrameworks.length === 0"
            class="text-muted-foreground"
          >
            Select frameworks...
          </span>
          <ChevronsUpDownIcon class="ml-auto size-4 shrink-0 opacity-50" />
        </div>
      </Combobox.Trigger>
    </Combobox.Anchor>

    <Combobox.List>
      <Combobox.Input placeholder="Search framework..." />
      <Combobox.Viewport>
        <Combobox.Empty>No framework found.</Combobox.Empty>
        <Combobox.Group>
          <Combobox.Item
            v-for="framework in collection.items"
            :key="framework.value"
            :item="framework"
          >
            {{ framework.label }}
            <Combobox.ItemIndicator>
              <CheckIcon />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Group>
      </Combobox.Viewport>
    </Combobox.List>
  </Combobox.Root>
</template>
