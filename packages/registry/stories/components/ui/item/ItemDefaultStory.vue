<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
</script>

<template>
  <Item.Root variant="outline" class="w-full max-w-md">
    <Item.Content>
      <Item.Title>Basic item</Item.Title>
      <Item.Description>
        A simple item with a title and description.
      </Item.Description>
    </Item.Content>

    <Item.Actions>
      <Button variant="outline" size="sm">
        Action
      </Button>
    </Item.Actions>
  </Item.Root>
</template>
