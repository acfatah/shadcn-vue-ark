<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    data-scope="sidebar"
    data-part="input"
    data-sidebar="input"
    :class="cn(
      'h-8 w-full bg-background shadow-none',
      props.class,
    )"
  >
    <slot />
  </Input>
</template>
