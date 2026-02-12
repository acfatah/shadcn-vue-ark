<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    v-bind="forwardedProps"
    data-scope="sidebar"
    data-part="group-label"
    data-sidebar="group-label"
    :class="cn(
      `
        flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium
        text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity]
        duration-200 ease-linear
        focus-visible:ring-2
        [&>svg]:size-4 [&>svg]:shrink-0
      `,
      'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
