<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { Dynamic } from '@/composables/dynamic'
import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

import type { AspectRatioProps } from './types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
  as: 'div',
})

const delegatedProps = reactiveOmit(props, ['as', 'asChild', 'class', 'ratio'])
const forwardedProps = useForwardProps(delegatedProps)
const { forwardRef } = useForwardExpose()

const aspect = computed(() => (1 / props.ratio) * 100)
const wrapperStyle = computed(() => ({
  paddingBottom: `${aspect.value}%`,
}))
</script>

<template>
  <div
    data-scope="aspect-ratio"
    :class="cn('relative w-full', props.class)"
    :style="wrapperStyle"
  >
    <component
      :is="props.asChild ? Dynamic : props.as"
      :ref="forwardRef"
      class="absolute inset-0"
      v-bind="{ ...$attrs, ...forwardedProps }"
    >
      <slot :aspect="aspect" />
    </component>
  </div>
</template>
