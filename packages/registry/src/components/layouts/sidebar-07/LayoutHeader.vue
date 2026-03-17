<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import { Sidebar } from '@/components/ui/sidebar'
</script>

<template>
  <header
    class="
      flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear
      group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
    "
  >
    <div class="flex items-center gap-2">
      <Sidebar.Trigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4!" />
    </div>
  </header>
</template>
