<script setup lang="ts">
import type { WithClassAsProps } from './types'

import { cn } from '@/lib/utils'

import { useCarousel } from './useCarousel'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div
    ref="carouselRef"
    data-scope="carousel"
    data-part="viewport"
    class="overflow-hidden"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )"
      data-scope="carousel"
      data-part="container"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
