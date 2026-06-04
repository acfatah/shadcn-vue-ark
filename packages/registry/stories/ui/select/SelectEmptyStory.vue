<script setup lang="ts">
import { createListCollection, Select } from '@/components/ui/select'

const storyArgs = withDefaults(defineProps<{
  position?: 'item-aligned' | 'popper'
}>(), {
  position: 'popper',
})

const collection = createListCollection<any>({
  items: [],
})
</script>

<template>
  <Select.Root :collection="collection">
    <Select.Label>Select an option</Select.Label>
    <Select.Trigger>
      <Select.ValueText placeholder="Please select..." />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Content :position="storyArgs.position">
      <Select.Empty>No options available.</Select.Empty>
    </Select.Content>
  </Select.Root>
</template>
