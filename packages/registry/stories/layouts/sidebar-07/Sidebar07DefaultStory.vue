<script setup lang="ts">
import SidebarLeft from '@/components/layouts/sidebar-07/SidebarLeft.vue'
import { Separator } from '@/components/ui/separator'
import { Sidebar } from '@/components/ui/sidebar'
</script>

<template>
  <Sidebar.Provider>
    <SidebarLeft />
    <Sidebar.Inset>
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

      <div class="flex flex-1 flex-col gap-4 p-4">
        <div
          class="
            grid auto-rows-min gap-4
            md:grid-cols-3
          "
        >
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-screen flex-1 rounded-xl bg-muted/50" />
      </div>
    </Sidebar.Inset>
  </Sidebar.Provider>
</template>
