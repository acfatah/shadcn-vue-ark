<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
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
    :is="props.asChild ? Dynamic : ark.button"
    v-bind="forwardedProps"
    data-scope="sidebar"
    data-part="group-action"
    data-sidebar="group-action"
    :class="cn(
      `
        absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0
        text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform
        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        [&>svg]:size-4 [&>svg]:shrink-0
      `,
      `
        after:absolute after:-inset-2
        md:after:hidden
      `,
      'group-data-[collapsible=icon]:hidden',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
