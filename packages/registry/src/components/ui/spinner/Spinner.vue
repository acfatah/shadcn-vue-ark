<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  icon?: string
  class?: HTMLAttributes['class']
}>(), {
  icon: 'lucide:loader-2',
})
</script>

<template>
  <Icon
    :icon="props.icon"
    role="status"
    aria-label="Loading"
    :class="cn('animate-spin', props.class)"
  />
</template>
