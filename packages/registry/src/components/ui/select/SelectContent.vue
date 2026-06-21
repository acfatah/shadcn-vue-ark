<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { SelectContentProps } from './types'

interface Props extends SelectContentProps {
  class?: HTMLAttributes['class']
  position?: 'item-aligned' | 'popper'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'item-aligned',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Teleport to="body" defer>
    <Select.Positioner
      class="-mt-1.5 max-w-(--available-width) min-w-(--reference-width)"
    >
      <Select.Content
        v-bind="forwardedProps"
        :class="cn(
          `
            relative z-50 max-h-(--available-height) min-w-(--reference-width)
            origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border
            bg-popover text-popover-foreground shadow-md
            focus:outline-none
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
          props.position === `popper`
            && `
              h-(--available-height) min-w-(--reference-width) scroll-my-1
              data-[side=bottom]:translate-y-1
              data-[side=left]:-translate-x-1
              data-[side=right]:translate-x-1
              data-[side=top]:-translate-y-1
            `,

          props.class,
        )"
      >
        <slot />
      </Select.Content>
    </Select.Positioner>
  </Teleport>
</template>
