<script setup lang="ts">
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'

import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <div class="flex items-center gap-2">
    <Toggle aria-label="Toggle bold">
      <BoldIcon class="size-4" />
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle italic">
      <ItalicIcon class="size-4" />
    </Toggle>
    <Toggle aria-label="Toggle underline" default-pressed>
      <UnderlineIcon class="size-4" />
    </Toggle>
  </div>
</template>
