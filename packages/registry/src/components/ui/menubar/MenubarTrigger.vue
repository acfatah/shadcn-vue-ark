<script setup lang="ts">
import type { MenuTriggerProps } from '@ark-ui/vue/menu'
import type { HTMLAttributes } from 'vue'

import { Menu } from '@ark-ui/vue/menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends MenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Menu.Trigger
    v-bind="forwardedProps"
    data-scope="menubar"
    data-part="trigger"
    :class="cn(
      `
        flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none
        focus:bg-accent focus:text-accent-foreground
        data-[state=open]:bg-accent data-[state=open]:text-accent-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </Menu.Trigger>
</template>
