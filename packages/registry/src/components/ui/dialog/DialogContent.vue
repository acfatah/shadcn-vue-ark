<script setup lang="ts">
import type { DialogContentProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import DialogOverlay from './DialogOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
})

interface Props extends DialogContentProps {
  class?: HTMLAttributes['class']
  showCloseButton?: boolean
}

const delegatedProps = reactiveOmit(props, ['class', 'showCloseButton'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DialogOverlay />
  <Dialog.Positioner class="fixed inset-0 z-50 grid place-items-center">
    <Dialog.Content
      v-bind="{ ...$attrs, ...forwardedProps }"
      data-scope="dialog"
      data-part="content"
      :class="cn(
        `
          z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border bg-background p-6
          shadow-lg duration-200
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          sm:max-w-lg
        `,
        props.class,
      )"
    >
      <slot />

      <Dialog.CloseTrigger
        v-if="props.showCloseButton"
        data-scope="dialog"
        data-part="close"
        class="
          absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity
          hover:opacity-100
          focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden
          disabled:pointer-events-none
          data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
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
