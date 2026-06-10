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
})))
</script>

<template>
  <ark.div
    data-scope="timeline"
    data-part="indicator"
    v-bind="delegatedProps"
    :class="cn(
      `
        z-1 flex shrink-0 items-center justify-center rounded-full bg-border
        group-data-[state=complete]/timeline-item:bg-primary
        group-data-[state=current]/timeline-item:bg-primary
      `,
      options.size === 'sm' && 'size-2.5',
      options.size === 'md' && 'size-3.5',
      options.size === 'lg' && 'size-5',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
