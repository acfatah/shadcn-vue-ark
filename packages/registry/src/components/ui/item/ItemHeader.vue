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
    data-part="header"
    :class="cn(
      'flex basis-full items-center justify-between gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
