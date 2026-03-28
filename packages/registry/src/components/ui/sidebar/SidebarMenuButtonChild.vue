<script setup lang="ts">
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { SidebarMenuButtonProps } from './types'

import { sidebarMenuButtonVariants } from './variant'

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  variant: 'default',
  size: 'default',
})

const delegatedProps = reactiveOmit(props, ['asChild', 'class', 'variant', 'size', 'isActive'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : ark.button"
    v-bind="forwardedProps"
    data-scope="sidebar"
    data-part="menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
