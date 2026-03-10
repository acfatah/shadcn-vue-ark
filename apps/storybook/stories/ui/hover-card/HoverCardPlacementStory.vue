<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HoverCard } from '@/components/ui/hover-card'

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
    <HoverCard.Root :align="align" :align-offset="alignOffset" :side="side" :side-offset="sideOffset">
      <HoverCard.Trigger as-child>
        <Button variant="link">
          @nuxt
        </Button>
      </HoverCard.Trigger>
      <HoverCard.Content class="w-80">
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">
            @nuxt
          </h4>
          <p class="text-sm">
            The Vue Framework – The Progressive Web Framework.
          </p>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  </div>
</template>
