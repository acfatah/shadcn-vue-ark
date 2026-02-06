<script setup lang="ts">
import type { PopoverContentProps } from '@ark-ui/vue/popover'
import type { HTMLAttributes } from 'vue'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends PopoverContentProps {
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
    <Popover.Positioner class="w-(--reference-width)">
      <Popover.Content
        v-bind="{ ...$attrs, ...forwardedProps }"
        data-scope="popover"
        data-part="content"
        :class="cn(
          `
            z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md
            outline-none
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
      </Popover.Content>
    </Popover.Positioner>
  </Teleport>
</template>
