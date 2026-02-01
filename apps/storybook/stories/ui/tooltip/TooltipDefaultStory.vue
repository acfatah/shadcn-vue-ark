<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger as-child>
      <Button variant="outline">
        Hover
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</template>
