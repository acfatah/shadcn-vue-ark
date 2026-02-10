<script setup lang="ts">
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends DialogCloseTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.CloseTrigger
    v-bind="forwardedProps"
    data-scope="sheet"
    data-part="close"
    :class="props.class"
  >
    <slot />
  </Dialog.CloseTrigger>
</template>
