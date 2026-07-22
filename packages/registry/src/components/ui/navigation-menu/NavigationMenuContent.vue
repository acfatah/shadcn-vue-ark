<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NavigationMenuContentProps } from './types'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useNavigationMenuOptions } from './context'

interface Props extends NavigationMenuContentProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const menuOptions = useNavigationMenuOptions(
  computed(() => ({
    viewport: true,
  })),
)
</script>

<template>
  <NavigationMenu.Content
    v-bind="{ ...$attrs, ...forwardedProps }"
    :class="cn(
      'top-0 left-0 w-full p-2 pr-2.5',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'md:absolute md:w-auto',
      !menuOptions.viewport && [
        `
          top-full mt-1.5 overflow-hidden rounded-md border bg-popover text-popover-foreground
          shadow-sm duration-200
        `,
        'data-[state=closed]:zoom-out-95',
        'data-[state=open]:zoom-in-95',
      ],
      props.class,
    )"
  >
    <slot />
  </NavigationMenu.Content>
</template>
