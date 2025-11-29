<script setup lang="ts">
import { Accordion } from '@/components/ui/accordion'
import { accordionItems } from './items'
</script>

<template>
  <Accordion.Root
    type="single"
    collapsible
    :default-value="accordionItems[0]!.value"
  >
    <Accordion.Item
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <Accordion.Trigger>{{ item.title }}</Accordion.Trigger>
      <Accordion.Content>
        <div
          class="flex flex-col gap-4 text-balance"
          v-html="item.content"
        />
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</template>
