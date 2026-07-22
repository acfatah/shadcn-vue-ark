<script setup lang="ts">
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

const actions = [
  { icon: BoldIcon, label: 'Bold' },
  { icon: ItalicIcon, label: 'Italic' },
  { icon: UnderlineIcon, label: 'Underline' },
]
</script>

<template>
  <div class="flex items-center gap-1 rounded-md border p-1">
    <Tooltip.Root v-for="action in actions" :key="action.label">
      <Tooltip.Trigger as-child>
        <Button
          variant="ghost"
          size="icon"
          :aria-label="action.label"
        >
          <component :is="action.icon" class="size-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {{ action.label }}
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</template>
