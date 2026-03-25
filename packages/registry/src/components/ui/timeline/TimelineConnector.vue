<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { useTimelineOptions } from './context'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')

const options = useTimelineOptions(computed(() => ({
  orientation: 'vertical' as const,
})))
</script>

<template>
  <ark.div
    data-scope="timeline"
    data-part="connector"
    :data-orientation="options.orientation"
    v-bind="delegatedProps"
    :class="cn(
      'flex items-center',
      options.orientation === 'vertical' ? 'flex-col' : 'flex-row',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
