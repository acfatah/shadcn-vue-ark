<script setup lang="ts">
import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Item.Root variant="outline">
      <Item.Content>
        <Item.Title>Basic Item</Item.Title>
        <Item.Description>
          A simple item with title and description.
        </Item.Description>
      </Item.Content>

      <Item.Actions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </Item.Actions>
    </Item.Root>

    <Item.Root variant="outline" size="sm" as-child>
      <a href="#">
        <Item.Media>
          <BadgeCheckIcon class="size-5" />
        </Item.Media>

        <Item.Content>
          <Item.Title>Your profile has been verified.</Item.Title>
        </Item.Content>

        <Item.Actions>
          <ChevronRightIcon class="size-4" />
        </Item.Actions>
      </a>
    </Item.Root>
  </div>
</template>
