<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Dynamic } from '@/composables/dynamic'
import { useForwardProps } from '@/composables/use-forward-props'
import { cn } from '@/lib/utils'

import type { BadgeVariants } from '.'
import { badgeVariants } from '.'

interface Props {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, ['asChild', 'class', 'variant'])
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <component
    v-bind="forwardedProps"
    :is="props.asChild ? Dynamic : 'span'"
    data-scope="badge"
    :class="cn(
      badgeVariants({ variant: props.variant }),
      props.class,
    )"
  >
    <slot />
  </component>
</template>
