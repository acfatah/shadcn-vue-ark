<script setup lang="ts">
import { Card } from '@/components/ui/card'
</script>

<template>
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Card title</Card.Title>
      <Card.Description>A short description of the card.</Card.Description>
    </Card.Header>
    <Card.Content>
      <p class="text-sm">
        Put any content here.
      </p>
    </Card.Content>
    <Card.Footer>
      <p class="text-sm text-muted-foreground">
        Card footer
      </p>
    </Card.Footer>
  </Card.Root>
</template>
