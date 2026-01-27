<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props extends DialogRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<DialogRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Dialog.Root
    v-bind="forwardedProps"
    :class="props.class"
    data-scope="dialog"
    data-part="root"
  >
    <slot />
  </Dialog.Root>
</template>
