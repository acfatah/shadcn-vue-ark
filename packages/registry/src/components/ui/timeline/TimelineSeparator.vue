<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { useTimelineOptions } from './context'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')

const options = useTimelineOptions(computed(() => ({
  size: 'md' as const,
  orientation: 'vertical' as const,
  reversed: false,
})))

const isReversed = computed(() => options.value.reversed)
const isVertical = computed(() => options.value.orientation === 'vertical')
const isHorizontal = computed(() => options.value.orientation === 'horizontal')
</script>

<template>
  <ark.div
    data-scope="timeline"
    data-part="separator"
    :data-orientation="options.orientation"
    v-bind="delegatedProps"
    :class="cn(
      `
        flex-1 bg-border
        group-data-[state=complete]/timeline-item:bg-primary
      `,
      isReversed ? `
        group-first/timeline-item:hidden
        group-data-[state=current]/timeline-item:bg-primary
      ` : 'group-last/timeline-item:hidden',
      isVertical && [
        options.size === 'sm' && 'w-px',
        options.size === 'md' && 'w-0.5',
        options.size === 'lg' && 'w-1',
      ],
      isHorizontal && [
        options.size === 'sm' && 'h-px',
        options.size === 'md' && 'h-0.5',
        options.size === 'lg' && 'h-1',
      ],
      props.class,
    )"
  />
</template>
