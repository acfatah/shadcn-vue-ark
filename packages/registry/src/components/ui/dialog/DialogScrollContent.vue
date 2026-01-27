<script setup lang="ts">
import type { DialogContentProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

interface Props extends DialogContentProps {
  class?: HTMLAttributes['class']
}

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.Backdrop
    data-scope="dialog"
    data-part="backdrop"
    class="
      fixed inset-0 z-50 bg-black/80
      data-[state=closed]:animate-out data-[state=closed]:fade-out-0
      data-[state=open]:animate-in data-[state=open]:fade-in-0
    "
  />
  <Dialog.Positioner
    data-scope="dialog"
    data-part="positioner"
    class="fixed inset-0 z-50 grid place-items-center overflow-y-auto"
  >
    <Dialog.Content
      data-scope="dialog"
      data-part="content"
      v-bind="{ ...$attrs, ...forwardedProps }"
      :class="cn(
        `
          relative z-50 my-8 grid w-full max-w-lg gap-4 border border-border bg-background p-6
          shadow-lg duration-200
          sm:rounded-lg
          md:w-full
        `,
        props.class,
      )"
    >
      <slot />

      <Dialog.CloseTrigger
        data-scope="dialog"
        data-part="close-trigger"
        class="
          absolute top-4 right-4 rounded-md p-0.5 transition-colors
          hover:bg-secondary
        "
      >
        <X class="size-4" />
        <span class="sr-only">Close</span>
      </Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</template>
