<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button
      variant="outline"
      @click="() => toast('Event has been created')"
    >
      Default
    </Button>

    <Button
      variant="outline"
      @click="() => toast.success('Event has been created')"
    >
      Success
    </Button>

    <Button
      variant="outline"
      @click="() => toast.info('Be at the area 10 minutes before the event time')"
    >
      Info
    </Button>

    <Button
      variant="outline"
      @click="() => toast.warning('Event start time cannot be earlier than 8am')"
    >
      Warning
    </Button>

    <Button
      variant="outline"
      @click="() => toast.error('Event has not been created')"
    >
      Error
    </Button>
  </div>
</template>
