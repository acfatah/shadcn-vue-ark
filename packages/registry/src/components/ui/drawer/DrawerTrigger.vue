<script setup lang="ts">
import type { DialogTriggerProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends DialogTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.Trigger
    v-bind="forwardedProps"
    data-scope="drawer"
    data-part="trigger"
    :class="props.class"
  >
    <slot />
  </Dialog.Trigger>
</template>
