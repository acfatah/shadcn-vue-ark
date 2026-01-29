<script setup lang="ts">
import { Bold, Italic, Underline } from 'lucide-vue-next'

import { ToggleGroup } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup.Root variant="outline" type="multiple">
    <ToggleGroup.Item value="bold" aria-label="Toggle bold">
      <Bold class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="italic" aria-label="Toggle italic">
      <Italic class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="underline" aria-label="Toggle underline">
      <Underline class="size-4" />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
