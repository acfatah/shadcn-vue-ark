<script setup lang="ts">
import type { Component } from 'vue'
import type { SidebarMenuButtonProps } from './types'

import { reactiveOmit } from '@vueuse/core'
import { computed, useAttrs } from 'vue'

import { TooltipContent, TooltipRoot, TooltipTrigger } from '@/components/ui/tooltip'

import SidebarMenuButtonChild from './SidebarMenuButtonChild.vue'
import { useSidebar } from './utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarMenuButtonProps & {
  tooltip?: string | Component
}>(), {
  variant: 'default',
  size: 'default',
})

const { isMobile, state } = useSidebar()

const delegatedProps = reactiveOmit(props, 'tooltip')

const attrs = useAttrs()
const tooltipSafeAttrs = computed(() => {
  const { id, ...rest } = attrs

  return rest
})
</script>

<template>
  <SidebarMenuButtonChild
    v-if="!tooltip"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot />
  </SidebarMenuButtonChild>

  <TooltipRoot
    v-else
    :open-delay="0"
    :close-delay="0"
    :disabled="state !== 'collapsed' || isMobile"
    :positioning="{ strategy: 'fixed' }"
    side="right"
    align="center"
  >
    <TooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...tooltipSafeAttrs }">
        <slot />
      </SidebarMenuButtonChild>
    </TooltipTrigger>
    <TooltipContent>
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </TooltipContent>
  </TooltipRoot>
</template>
