<script setup lang="ts">
import type { HoverCardContentProps } from '@ark-ui/vue/hover-card'
import type { HTMLAttributes } from 'vue'

import { HoverCard } from '@ark-ui/vue/hover-card'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends HoverCardContentProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Teleport to="body" defer>
    <HoverCard.Positioner>
      <HoverCard.Content
        v-bind="{ ...$attrs, ...forwardedProps }"
        data-scope="hover-card"
        data-part="content"
        :class="cn(
          `
            z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md
            outline-hidden
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
        <slot />
      </HoverCard.Content>
    </HoverCard.Positioner>
  </Teleport>
</template>
