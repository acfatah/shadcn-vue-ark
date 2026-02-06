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

const collection = createListCollection({
  items: frameworks,
})

const selectedFramework = computed(() =>
  frameworks.find(framework => framework.value === value.value[0]),
)
</script>

<template>
  <Combobox.Root
    v-model="value"
    :collection="collection"
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
            v-for="framework in frameworks"
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
