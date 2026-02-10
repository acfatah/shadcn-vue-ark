<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['asChild', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : 'a'"
    v-bind="forwardedProps"
    data-scope="breadcrumb"
    data-part="link"
    :class="cn(
      `
        rounded-xs transition-colors outline-none
        hover:text-foreground
        focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50
      `,
      props.class,
    )"
  >
    <slot />
  </component>
</template>
