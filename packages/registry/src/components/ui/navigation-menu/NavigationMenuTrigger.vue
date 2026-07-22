<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { NavigationMenuTriggerProps } from './types'

import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { navigationMenuTriggerStyle } from './variant'

interface Props extends NavigationMenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <NavigationMenu.Trigger
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
    <slot name="icon">
      <ChevronDownIcon
        class="
          relative top-px ml-1 size-3 transition duration-300
          group-data-[state=open]:rotate-180
        "
        aria-hidden="true"
      />
    </slot>
  </NavigationMenu.Trigger>
</template>
