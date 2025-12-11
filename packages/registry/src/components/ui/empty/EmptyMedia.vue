<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import type { EmptyMediaVariants } from '.'
import { emptyMediaVariants } from '.'

interface Props {
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-scope="empty"
    data-part="media"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
