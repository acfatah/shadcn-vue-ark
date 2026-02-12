<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { PanelLeft } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-scope="sidebar"
    data-part="trigger"
    variant="ghost"
    size="icon"
    :class="cn('size-7', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
