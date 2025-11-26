<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div
    class="
      flex flex-wrap items-center gap-2
      md:flex-row
    "
  >
    <Button variant="outline">
      Button
    </Button>

    <Button
      variant="outline"
      size="icon"
      aria-label="Submit"
    >
      <Icon icon="lucide:arrow-up" />
    </Button>
  </div>
</template>
