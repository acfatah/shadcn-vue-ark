<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  size?: 'sm' | 'md'
  isActive?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'a',
  size: 'md',
})

const delegatedProps = reactiveOmit(props, ['class', 'size', 'isActive'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.a
    v-bind="forwardedProps"
    data-scope="sidebar"
    data-part="menu-sub-button"
    data-sidebar="menu-sub-button"
    :data-size="size"
    :data-active="isActive"
    :class="cn(
      `
        flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2
        text-sidebar-foreground ring-sidebar-ring outline-hidden
        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        active:bg-sidebar-accent active:text-sidebar-accent-foreground
        disabled:pointer-events-none disabled:opacity-50
        aria-disabled:pointer-events-none aria-disabled:opacity-50
        [&>span:last-child]:truncate
        [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground
      `,
      'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      'group-data-[collapsible=icon]:hidden',
      props.class,
    )"
  >
    <slot />
  </ark.a>
</template>
