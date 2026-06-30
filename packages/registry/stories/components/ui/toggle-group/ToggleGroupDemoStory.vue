<script setup lang="ts">
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-vue-next'

import { ToggleGroup } from '@/components/ui/toggle-group'
</script>

<template>
  <ToggleGroup.Root variant="outline" :default-value="['left']">
    <ToggleGroup.Item value="left" aria-label="Align left">
      <AlignLeftIcon class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="center" aria-label="Align center">
      <AlignCenterIcon class="size-4" />
    </ToggleGroup.Item>
    <ToggleGroup.Item value="right" aria-label="Align right">
      <AlignRightIcon class="size-4" />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
