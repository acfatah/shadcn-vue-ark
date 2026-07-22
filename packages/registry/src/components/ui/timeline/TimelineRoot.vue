<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TimelineOrientation, TimelineSize } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { TimelineOptionsProvider } from './context'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
  size?: TimelineSize
  orientation?: TimelineOrientation
  reversed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  orientation: 'vertical',
  reversed: false,
})

const options = computed(() => ({
  size: props.size,
  orientation: props.orientation,
  reversed: props.reversed,
}))

TimelineOptionsProvider(options)

const delegatedProps = reactiveOmit(props, ['class', 'size', 'orientation', 'reversed'])

const flexDirection = computed(() => {
  if (props.orientation === 'vertical') {
    return props.reversed ? 'flex-col-reverse' : 'flex-col'
  }

  return props.reversed ? 'flex-row-reverse' : 'flex-row'
})
</script>

<template>
  <ark.div
    role="list"
    data-scope="timeline"
    data-part="root"
    :data-orientation="props.orientation"
    :data-size="props.size"
    v-bind="delegatedProps"
    :class="cn(
      'flex',
      flexDirection,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
