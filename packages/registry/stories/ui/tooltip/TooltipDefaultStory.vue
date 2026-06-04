<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

interface Props {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'bottom',
})
</script>

<template>
  <Tooltip.Root :align="align" :side="side">
    <Tooltip.Trigger as-child>
      <Button variant="outline">
        Hover
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</template>
