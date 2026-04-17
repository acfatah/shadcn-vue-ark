<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ref, useTemplateRef } from 'vue'

import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const mouseY = ref(0)

function onMousemove(e: MouseEvent) {
  mouseY.value = e.clientY
}

const virtualAnchor = {
  getBoundingClientRect() {
    const el = buttonRef.value
    if (!el)
      return { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }

    const rect = el.getBoundingClientRect()

    return {
      x: rect.x,
      y: mouseY.value,
      width: rect.width,
      height: 0,
      top: mouseY.value,
      left: rect.left,
      right: rect.right,
      bottom: mouseY.value,
    }
  },
}

function getAnchorElement() {
  return buttonRef.value ? virtualAnchor : null
}

const tooltipPositioning = { getAnchorElement }
</script>

<template>
  <Tooltip.Root side="right" :positioning="tooltipPositioning">
    <Tooltip.Trigger as-child>
      <button
        ref="buttonRef"
        data-sidebar="rail"
        data-scope="sidebar"
        data-part="rail"
        aria-label="Toggle Sidebar"
        :tabindex="-1"
        :class="cn(
          `
            absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear
            group-data-[side=left]:-right-4
            group-data-[side=right]:left-0
            after:absolute after:inset-y-0 after:left-1/2 after:w-0.5
            hover:after:bg-transparent
            sm:flex
          `,
          `
            in-data-[side=left]:cursor-w-resize
            in-data-[side=right]:cursor-e-resize
          `,
          `
            [[data-side=left][data-state=collapsed]_&]:cursor-e-resize
            [[data-side=right][data-state=collapsed]_&]:cursor-w-resize
          `,
          `
            group-data-[collapsible=offcanvas]:translate-x-0
            group-data-[collapsible=offcanvas]:after:left-full
            hover:group-data-[collapsible=offcanvas]:bg-sidebar-primary/50
          `,
          '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
          '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
          props.class,
        )"
        @mousemove="onMousemove"
        @click="toggleSidebar"
      >
        <slot />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      Toggle Sidebar
    </Tooltip.Content>
  </Tooltip.Root>
</template>
