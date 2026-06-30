<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
</script>

<template>
  <Avatar.Root>
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
</template>
