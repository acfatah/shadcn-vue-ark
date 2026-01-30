<script setup lang="ts">
import { Select as ArkSelect, createListCollection } from '@ark-ui/vue/select'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

import { Select } from '@/components/ui/select'

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const frameworks: Item[] = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]

const collection = createListCollection<Item>({
  items: frameworks,
})

const value = ref<string[]>(['vue'])
</script>

<template>
  <Select.Root v-model="value" :collection="collection">
    <Select.HiddenSelect />
    <Select.Label>Framework</Select.Label>

    <Select.Control>
      <Select.Trigger>
        <ArkSelect.ValueText placeholder="Select a Framework" />
        <Select.Indicator>
          <Icon icon="lucide:chevron-down" />
        </Select.Indicator>
      </Select.Trigger>
      <ArkSelect.ClearTrigger>Clear</ArkSelect.ClearTrigger>
    </Select.Control>

    <Select.Content>
      <Select.ItemGroup>
        <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
        <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
          <Select.ItemText>{{ item.label }}</Select.ItemText>
          <Select.ItemIndicator>✓</Select.ItemIndicator>
        </Select.Item>
      </Select.ItemGroup>
    </Select.Content>
  </Select.Root>
</template>
