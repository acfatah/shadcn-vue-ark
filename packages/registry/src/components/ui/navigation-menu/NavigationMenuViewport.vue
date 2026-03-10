<script setup lang="ts">
import type { NavigationMenuViewportProps } from '@ark-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends NavigationMenuViewportProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.ViewportPositioner
    class="absolute top-full left-0 isolate z-50 flex justify-center"
  >
    <NavigationMenu.Viewport
      v-bind="forwardedProps"
      :class="cn(
        'origin-top-center relative mt-1.5 h-(--viewport-height) w-full overflow-hidden',
        'rounded-md border bg-popover shadow-sm',
        'text-popover-foreground',
        'data-[state=closed]:animate-out data-[state=closed]:zoom-out-95',
        'data-[state=open]:animate-in data-[state=open]:zoom-in-90',
        'md:w-(--viewport-width)',
        props.class,
      )"
    />
  </NavigationMenu.ViewportPositioner>
</template>
