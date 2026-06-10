<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { NavigationMenuItemProps } from './types'

interface Props extends NavigationMenuItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.Item
    v-bind="forwardedProps"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenu.Item>
</template>
