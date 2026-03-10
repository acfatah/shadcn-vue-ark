<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  asChild?: boolean
  showOnHover?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, ['asChild', 'class', 'showOnHover'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : ark.button"
    v-bind="forwardedProps"
    data-scope="sidebar"
    data-part="menu-action"
    data-sidebar="menu-action"
    :class="cn(
      `
        absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0
        text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform
        peer-hover/menu-button:text-sidebar-accent-foreground
        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        [&>svg]:size-4 [&>svg]:shrink-0
      `,
      `
        after:absolute after:-inset-2
        md:after:hidden
      `,
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      showOnHover
        && `
          group-focus-within/menu-item:opacity-100
          group-hover/menu-item:opacity-100
          peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
          data-[state=open]:opacity-100
          md:opacity-0
        `,
      props.class,
    )"
  >
    <slot />
  </component>
</template>
