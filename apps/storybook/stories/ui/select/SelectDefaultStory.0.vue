<script setup lang="ts">
// import { createListCollection, Select } from '@ark-ui/vue/select'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

import { createListCollection, Select } from '@/components/ui/select'

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
const displayValue = computed(() => {
  if (!value.value.length)
    return ''

  const labels = value.value.map(baseValue =>
    frameworks.find(item => item.value === baseValue)?.label ?? baseValue,
  )

  return labels.join(', ')
})
</script>

<template>
  <Select.Root v-model="value" :collection="collection">
    <Select.HiddenSelect />
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework">
          {{ displayValue || 'Select a Framework' }}
        </Select.ValueText>
        <Select.Indicator>
          <Icon icon="lucide:chevron-down" />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <!-- <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            <Select.Item
              v-for="item in collection.items"
              :key="item.value"
              :item="item"
            >
              <Select.ItemText>{{ item.label ?? item.value }}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport> -->

    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
          <Select.Item
            v-for="item in collection.items"
            :key="item.value"
            :item="item"
          >
            <Select.ItemText>{{ item.label ?? item.value }}</Select.ItemText>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
          </Select.Item>
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
</template>
