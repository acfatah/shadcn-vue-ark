<script setup lang="ts">
import { ref } from 'vue'

import { createListCollection, Select } from '@/components/ui/select'

interface Props {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

withDefaults(defineProps<Props>(), {
  align: 'start',
  side: 'right',
})

interface Item {
  label: string
  value: string
}

const fruits: Item[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
]

const collection = createListCollection<Item>({
  items: fruits,
})

const value = ref<string[]>([])
</script>

<template>
  <div class="flex min-h-[50vh] w-full items-center justify-center">
    <Select.Root v-model="value" :collection="collection" :align="align" :side="side">
      <Select.HiddenSelect />
      <Select.Label>Fruits</Select.Label>

      <Select.Trigger>
        <Select.ValueText placeholder="Select a fruit" />
      </Select.Trigger>

      <Select.Content>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
            <Select.ItemText>{{ item.label }}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        </Select.ItemGroup>
      </Select.Content>
    </Select.Root>
  </div>
</template>
