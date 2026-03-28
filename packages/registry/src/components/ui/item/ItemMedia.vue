<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

import type { ItemMediaVariants } from './types'

import { itemMediaVariants } from './variant'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: ItemMediaVariants['variant']
}>()
</script>

<template>
  <div
    data-scope="item"
    data-part="media"
    :data-variant="props.variant"
    :class="cn(
      itemMediaVariants({ variant }),
      props.class,
    )"
  >
    <slot />
  </div>
</template>
