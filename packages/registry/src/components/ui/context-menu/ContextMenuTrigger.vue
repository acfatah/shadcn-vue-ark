<script setup lang="ts">
import type { MenuContextTriggerProps } from '@ark-ui/vue/menu'
import type { HTMLAttributes } from 'vue'

import { Menu } from '@ark-ui/vue/menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends MenuContextTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Menu.ContextTrigger
    v-bind="forwardedProps"
    data-scope="context-menu"
    data-part="trigger"
    :class="cn(
      `
        outline-none
        focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
      `,
      props.class,
    )"
  >
    <slot />
  </Menu.ContextTrigger>
</template>
