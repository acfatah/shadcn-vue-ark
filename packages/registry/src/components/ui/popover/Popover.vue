<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'
import type { HTMLAttributes } from 'vue'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends PopoverRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<PopoverRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Popover.Root
    v-bind="forwardedProps"
    :class="props.class"
  >
    <slot />
  </Popover.Root>
</template>
