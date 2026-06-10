<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { NavigationMenuListProps } from './types'

interface Props extends NavigationMenuListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.List
    v-bind="forwardedProps"
    :class="cn(
      'group flex flex-1 list-none items-center justify-center gap-1',
      props.class,
    )"
  >
    <slot />
  </NavigationMenu.List>
</template>
