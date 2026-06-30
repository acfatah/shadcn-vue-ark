<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'

const ratios = [
  { label: '1 / 1', value: 1 },
  { label: '16 / 9', value: 16 / 9 },
  { label: '4 / 3', value: 4 / 3 },
]
</script>

<template>
  <div class="grid w-[600px] grid-cols-3 gap-4">
    <AspectRatio
      v-for="r in ratios"
      :key="r.label"
      :ratio="r.value"
      class="rounded-lg bg-muted"
    >
      <div
        class="flex size-full items-center justify-center text-sm text-foreground"
      >
        {{ r.label }}
      </div>
    </AspectRatio>
  </div>
</template>
