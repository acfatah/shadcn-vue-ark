<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { toast, Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Button
    variant="outline"
    @click="() =>
      toast('Event has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      })
    "
  >
    Show Toast
  </Button>
  <Teleport to="body">
    <Toaster />
  </Teleport>
</template>
