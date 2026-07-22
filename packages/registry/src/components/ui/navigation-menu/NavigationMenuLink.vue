<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NavigationMenuLinkProps } from './types'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends NavigationMenuLinkProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.Link
    v-bind="forwardedProps"
    :class="cn(
      'flex flex-col gap-1 p-2',
      'rounded-sm ring-ring/10 outline-ring/50',
      'text-sm',
      'transition-[color,box-shadow]',
      'hover:bg-accent hover:text-accent-foreground',
      `
        focus:bg-accent focus:text-accent-foreground
        focus-visible:ring-4 focus-visible:outline-1
      `,
      `
        data-current:bg-accent/50 data-current:text-accent-foreground
        data-current:hover:bg-accent
        data-current:focus:bg-accent
      `,
      'dark:ring-ring/20 dark:outline-ring/40',
      `
        [&_svg:not([class*='size-'])]:size-4
        [&_svg:not([class*='text-'])]:text-muted-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </NavigationMenu.Link>
</template>
