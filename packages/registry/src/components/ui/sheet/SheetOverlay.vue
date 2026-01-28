<script setup lang="ts">
import type { DialogBackdropProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends DialogBackdropProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.Backdrop
    v-bind="forwardedProps"
    data-scope="sheet"
    data-part="overlay"
    :class="cn(
      `
        fixed inset-0 z-50 bg-black/80
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      props.class,
    )"
  >
    <slot />
  </Dialog.Backdrop>
</template>
