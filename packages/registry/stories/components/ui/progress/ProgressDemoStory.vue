<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <div class="flex w-[60%] flex-col gap-4">
    <Progress :default-value="25" />
    <Progress :default-value="50" />
    <Progress :default-value="80" />
  </div>
</template>
