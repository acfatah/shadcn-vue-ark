<script setup lang="ts">
import { ref } from 'vue'

import { createListCollection, Select } from '@/components/ui/select'

const storyArgs = withDefaults(defineProps<{
  position?: 'item-aligned' | 'popper'
}>(), {
  position: 'item-aligned',
})

interface Item {
  label: string
  value: string
  disabled?: boolean
}

const frameworks: Item[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes', disabled: true },
  { label: 'Pineapple', value: 'pineapple' },
  {
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    value: 'lorem-ipsum',
  },
]

const collection = createListCollection<Item>({
  items: frameworks,
})

const value = ref<string[]>(['banana'])
</script>

<template>
  <Select.Root
    v-model="value"
    :collection="collection"
  >
    <Select.HiddenSelect />
    <Select.Label>Fruits</Select.Label>

    <Select.Trigger clearable>
      <Select.ValueText placeholder="Select a fruit" />
    </Select.Trigger>

    <Select.Content :position="storyArgs.position">
      <Select.ItemGroup>
        <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
        <Select.Empty>No fruits found.</Select.Empty>
        <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
          <Select.ItemText>{{ item.label }}</Select.ItemText>
        </Select.Item>

        <Select.Separator />
        <Select.Item :item="{}" disabled>
          <Select.ItemText>Raspberry (Disabled)</Select.ItemText>
        </Select.Item>
      </Select.ItemGroup>
    </Select.Content>
  </Select.Root>
</template>
