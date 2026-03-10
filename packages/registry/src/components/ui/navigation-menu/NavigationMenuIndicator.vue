<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from '@ark-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends NavigationMenuIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.Indicator
    v-bind="forwardedProps"
    :class="cn(
      'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
      'data-[state=hidden]:animate-out data-[state=hidden]:fade-out',
      'data-[state=visible]:animate-in data-[state=visible]:fade-in',
      props.class,
    )"
  >
    <div class="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenu.Indicator>
</template>
