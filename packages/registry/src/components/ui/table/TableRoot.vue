<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-scope="table"
    data-part="root"
    class="relative w-full overflow-auto"
  >
    <table
      data-scope="table"
      data-part="table"
      :class="cn(
        'w-full caption-bottom text-sm',
        props.class,
      )"
    >
      <slot />
    </table>
  </div>
</template>
