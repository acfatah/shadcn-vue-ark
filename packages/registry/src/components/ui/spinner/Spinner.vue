<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

interface Props {
  icon?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:loader-circle',
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
