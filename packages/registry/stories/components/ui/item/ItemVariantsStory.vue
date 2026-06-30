<script setup lang="ts">
import { Item } from '@/components/ui/item'

const variants = ['default', 'outline', 'muted'] as const
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Item.Root v-for="v in variants" :key="v" :variant="v">
      <Item.Content>
        <Item.Title>{{ v }}</Item.Title>
        <Item.Description>Item with the {{ v }} variant.</Item.Description>
      </Item.Content>
    </Item.Root>
  </div>
</template>
