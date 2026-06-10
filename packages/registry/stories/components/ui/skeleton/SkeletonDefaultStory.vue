<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-62" />
      <Skeleton class="h-4 w-50" />
    </div>
  </div>
</template>
