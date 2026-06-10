<script setup lang="ts">
import { ArrowUpIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-8">
    <Button variant="outline" size="icon" class="rounded-full">
      <ArrowUpIcon data-part="icon" />
    </Button>
  </div>
</template>
