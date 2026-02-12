<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { computed } from 'vue'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes['class']
}>()

const width = computed(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
  <div
    data-scope="sidebar"
    data-part="menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-scope="sidebar"
      data-part="menu-skeleton-icon"
    />

    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-scope="sidebar"
      data-part="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
