<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-scope="item"
    data-part="title"
    :class="cn(
      'flex w-fit items-center gap-2 text-sm/snug font-medium',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
