<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

interface Props {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'right',
})
</script>

<template>
  <div class="flex min-h-[50vh] w-full items-center justify-center">
    <Popover.Root :align="align" :side="side">
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
