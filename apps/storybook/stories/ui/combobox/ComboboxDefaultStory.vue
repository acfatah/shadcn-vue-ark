<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/combobox'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
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

const selectedFramework = computed(() =>
  frameworks.find(framework => framework.value === value.value[0]),
)

function handleInputValueChange(details: { inputValue: string }) {
  inputValue.value = details.inputValue
}
</script>

<template>
  <Combobox.Root
    v-model="value"
    :input-value="inputValue"
    :collection="collection"
    @input-value-change="handleInputValueChange"
  >
    <Combobox.Anchor>
      <Combobox.Trigger as-child>
        <Button
          variant="outline"
          class="w-full justify-between"
        >
          {{ selectedFramework?.label || 'Select framework...' }}
          <ChevronsUpDownIcon class="opacity-50" />
        </Button>
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
