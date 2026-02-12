<script setup lang="ts">
import type { DialogContentProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import DrawerOverlay from './DrawerOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  direction: 'bottom',
  showHandle: true,
})

interface Props extends DialogContentProps {
  class?: HTMLAttributes['class']
  direction?: 'top' | 'right' | 'bottom' | 'left'
  showHandle?: boolean
}

const delegatedProps = reactiveOmit(props, ['class', 'direction', 'showHandle'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DrawerOverlay />
  <Dialog.Positioner
    class="fixed inset-0 z-50"
    data-scope="drawer"
    data-part="positioner"
  >
    <Dialog.Content
      v-bind="{ ...$attrs, ...forwardedProps }"
      :data-direction="props.direction"
      data-scope="drawer"
      data-part="content"
      :class="cn(
        `
          group/drawer-content fixed z-50 flex h-auto flex-col bg-background
          data-[state=closed]:animate-out data-[state=closed]:duration-300
          data-[state=open]:animate-in data-[state=open]:duration-500
        `,
        props.direction === 'top'
          && `
            inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg
            data-[state=closed]:slide-out-to-top
            data-[state=open]:slide-in-from-top
          `,
        props.direction === 'bottom'
          && `
            inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg
            data-[state=closed]:slide-out-to-bottom
            data-[state=open]:slide-in-from-bottom
          `,
        props.direction === 'right'
          && `
            inset-y-0 right-0 w-3/4
            data-[state=closed]:slide-out-to-right
            data-[state=open]:slide-in-from-right
            sm:max-w-sm
          `,
        props.direction === 'left'
          && `
            inset-y-0 left-0 w-3/4
            data-[state=closed]:slide-out-to-left
            data-[state=open]:slide-in-from-left
            sm:max-w-sm
          `,
        props.class,
      )"
    >
      <div
        v-if="props.showHandle && props.direction === 'bottom'"
        class="mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted"
      />
      <slot />
    </Dialog.Content>
  </Dialog.Positioner>
</template>
