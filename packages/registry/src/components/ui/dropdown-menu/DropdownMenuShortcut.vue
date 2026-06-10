<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ark.span
    data-scope="dropdown-menu"
    data-part="shortcut"
    v-bind="forwardedProps"
    :class="cn(
      'ml-auto text-xs tracking-widest text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </ark.span>
</template>
