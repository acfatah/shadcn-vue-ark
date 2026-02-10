<script setup lang="ts">
import type { DialogContentProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import SheetOverlay from './SheetOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
  showCloseButton: true,
})

interface Props extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}

const delegatedProps = reactiveOmit(props, ['class', 'side', 'showCloseButton'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <SheetOverlay />
  <Dialog.Positioner
    class="fixed inset-0 z-50"
    data-scope="sheet"
    data-part="positioner"
  >
    <Dialog.Content
      v-bind="{ ...$attrs, ...forwardedProps }"
      data-scope="sheet"
      data-part="content"
      :class="cn(
        `
          fixed z-50 flex h-full flex-col gap-4 bg-background shadow-lg transition ease-in-out
          data-[state=closed]:animate-out data-[state=closed]:duration-300
          data-[state=open]:animate-in data-[state=open]:duration-500
        `,
        props.side === 'right'
          && `
            inset-y-0 right-0 w-3/4 border-l
            data-[state=closed]:slide-out-to-right
            data-[state=open]:slide-in-from-right
            sm:max-w-sm
          `,
        props.side === 'left'
          && `
            inset-y-0 left-0 w-3/4 border-r
            data-[state=closed]:slide-out-to-left
            data-[state=open]:slide-in-from-left
            sm:max-w-sm
          `,
        props.side === 'top'
          && `
            inset-x-0 top-0 h-auto border-b
            data-[state=closed]:slide-out-to-top
            data-[state=open]:slide-in-from-top
          `,
        props.side === 'bottom'
          && `
            inset-x-0 bottom-0 h-auto border-t
            data-[state=closed]:slide-out-to-bottom
            data-[state=open]:slide-in-from-bottom
          `,
        props.class,
      )"
    >
      <slot />

      <Dialog.CloseTrigger
        v-if="props.showCloseButton"
        data-scope="sheet"
        data-part="close"
        class="
          absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity
          hover:opacity-100
          focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden
          disabled:pointer-events-none
          data-[state=open]:bg-secondary
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*='size-'])]:size-4
        "
      >
        <X />
        <span class="sr-only">Close</span>
      </Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</template>
