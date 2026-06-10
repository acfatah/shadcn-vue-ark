<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio :ratio="16 / 9" class="rounded-lg bg-muted">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      class="
        size-full rounded-lg object-cover
        dark:brightness-[0.2] dark:grayscale
      "
    >
  </AspectRatio>
</template>
