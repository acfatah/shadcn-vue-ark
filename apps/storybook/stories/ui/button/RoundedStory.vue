<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-8">
    <Button variant="outline" size="icon" class="rounded-full">
      <Icon icon="lucide:arrow-up" />
    </Button>
  </div>
</template>
