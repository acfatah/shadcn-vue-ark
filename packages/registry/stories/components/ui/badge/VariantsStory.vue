<script setup lang="ts">
import { Badge, variant as badgeVariants } from '@/components/ui/badge'

const variants = Object.keys(badgeVariants) as Array<keyof typeof badgeVariants>
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Badge
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
    >
      {{ variant }}
    </Badge>
  </div>
</template>
