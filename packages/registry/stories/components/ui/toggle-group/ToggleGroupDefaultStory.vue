<script setup lang="ts">
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'

import { ToggleGroup } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup.Root variant="outline" multiple>
    <ToggleGroup.Item value="bold" aria-label="Toggle bold">
      <BoldIcon class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="italic" aria-label="Toggle italic">
      <ItalicIcon class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="underline" aria-label="Toggle underline">
      <UnderlineIcon class="size-4" />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
