<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from './types'

import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
  as?: string
  orientation?: ButtonGroupVariants['orientation']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  orientation: 'horizontal',
})
const delegatedProps = reactiveOmit(props, ['class', 'asChild', 'as', 'orientation'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : props.as"
    role="group"
    data-scope="button-group"
    data-part="text"
    :data-orientation="props.orientation"
    :class="cn(
      `
        flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs
        [&_svg]:pointer-events-none
        [&_svg:not([class*=\'size-\'])]:size-4
      `,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </component>
</template>
