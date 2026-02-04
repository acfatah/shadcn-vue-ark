<script setup lang="ts">
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'

const isOpen = ref(false)
</script>

<template>
  <Collapsible.Root
    v-model:open="isOpen"
    class="flex w-[350px] flex-col gap-2"
  >
    <div class="flex items-center justify-between gap-4 px-4">
      <h4 class="text-sm font-semibold">
        @peduarte starred 3 repositories
      </h4>
      <Collapsible.Trigger as-child>
        <Button variant="ghost" size="icon" class="size-8">
          <ChevronsUpDown />
          <span class="sr-only">Toggle</span>
        </Button>
      </Collapsible.Trigger>
    </div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm">
      @radix-ui/primitives
    </div>
    <Collapsible.Content class="flex flex-col gap-2">
      <div class="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/colors
      </div>
      <div class="rounded-md border px-4 py-2 font-mono text-sm">
        @stitches/react
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
