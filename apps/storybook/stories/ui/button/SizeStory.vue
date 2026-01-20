<script setup lang="ts">
import { ArrowUpIcon } from 'lucide-vue-next'

import { Button, size as sizeVariant } from '@/components/ui/button'

const sizes = Object.keys(sizeVariant) as Array<keyof typeof sizeVariant>
</script>

<template>
  <div
    class="
      flex flex-col items-start gap-8
      sm:flex-row
    "
  >
    <div v-for="size in sizes" :key="size" class="flex items-start gap-2">
      <template v-if="size.startsWith('icon')">
        {{ size }}:&nbsp;
      </template>
      <template v-else>
        <Button :size="size" variant="outline">
          {{ size }}
        </Button>
      </template>

      <Button :size="size" aria-label="Submit" variant="outline">
        <ArrowUpIcon data-part="icon" />
      </Button>
    </div>
  </div>
</template>
