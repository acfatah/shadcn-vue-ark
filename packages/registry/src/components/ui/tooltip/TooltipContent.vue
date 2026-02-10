<script setup lang="ts">
import type { TooltipContentProps } from '@ark-ui/vue/tooltip'
import type { HTMLAttributes } from 'vue'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useTooltipOptions } from './context'
import TooltipArrow from './TooltipArrow.vue'

interface Props extends TooltipContentProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const tooltipOptions = useTooltipOptions(
  computed(() => ({
    hideArrow: false,
  })),
)
</script>

<template>
  <Teleport to="body" defer>
    <Tooltip.Positioner>
      <Tooltip.Content
        v-bind="{ ...$attrs, ...forwardedProps }"
        data-scope="tooltip"
        data-part="content"
        :class="cn(
          `
            z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background
            outline-none
          `,
          `
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          `,
          props.class,
        )"
      >
        <TooltipArrow v-if="!tooltipOptions.hideArrow" />
        <slot />
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Teleport>
</template>
