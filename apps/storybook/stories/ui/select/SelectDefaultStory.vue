<script setup lang="ts">
import { computed, ref } from 'vue'
import { createListCollection, Select } from '@/components/ui/select'

const props = withDefaults(defineProps<{
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
const emptyValue = computed(() => !value.value.length)
</script>

<template>
  <Select.Root v-model="value" :collection="collection">
    <Select.HiddenSelect />
    <Select.Label>Fruits</Select.Label>

    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a fruit" />
        <Select.Indicator v-if="emptyValue" />
        <Select.ClearTrigger v-else />
      </Select.Trigger>
    </Select.Control>

    <Select.Content :position="props.position">
      <Select.ItemGroup>
        <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
        <Select.Empty>No fruits found.</Select.Empty>
        <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
          <Select.ItemText>{{ item.label }}</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>

        <Select.Separator />
        <Select.Item :item="{}" disabled>
          <Select.ItemText>Raspberry (Disabled)</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.ItemGroup>
    </Select.Content>
  </Select.Root>
</template>
