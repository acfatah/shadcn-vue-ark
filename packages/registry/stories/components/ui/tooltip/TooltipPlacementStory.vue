<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

interface Props {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  alignOffset: 0,
  side: 'right',
  sideOffset: 4,
})
</script>

<template>
  <div class="flex min-h-[50vh] w-full items-center justify-center">
    <Tooltip.Root
      :align="align"
      :align-offset="alignOffset"
      :side="side"
      :side-offset="sideOffset"
    >
      <Tooltip.Trigger as-child>
        <Button variant="outline">
          Hover
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Add to library</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</template>
