<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar.Root v-for="s in sizes" :key="s" :size="s">
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </div>
</template>
