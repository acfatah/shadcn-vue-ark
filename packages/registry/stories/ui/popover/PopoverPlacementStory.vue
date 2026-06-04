<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

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
    <Popover.Root :align="align" :align-offset="alignOffset" :side="side" :side-offset="sideOffset">
      <Popover.Trigger as-child>
        <Button variant="outline">
          Open popover
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="leading-none font-medium">
              Dimensions
            </h4>
            <p class="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
</template>
