<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { useTimelineOptions } from './context'

export type TimelineStatus = 'complete' | 'current' | 'incomplete'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
  status?: TimelineStatus
}

const props = withDefaults(defineProps<Props>(), {
  status: 'incomplete',
})
const delegatedProps = reactiveOmit(props, ['class', 'status'])

const options = useTimelineOptions(computed(() => ({
  orientation: 'vertical' as const,
  reversed: false,
})))

const isVertical = computed(() => options.value.orientation === 'vertical')
</script>

<template>
  <ark.div
    role="listitem"
    data-scope="timeline"
    data-part="item"
    :data-orientation="options.orientation"
    :data-state="props.status"
    v-bind="delegatedProps"
    :class="cn(
      'group/timeline-item relative flex gap-3',
      isVertical
        ? `
          flex-row
          last:pb-0
        `
        : `
          flex-col
          last:pr-0
        `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
