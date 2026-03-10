<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HoverCard } from '@/components/ui/hover-card'

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
    <HoverCard.Root :align="align" :side="side">
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
