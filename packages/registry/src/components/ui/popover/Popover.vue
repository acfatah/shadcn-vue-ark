<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'

import { Popover } from '@ark-ui/vue/popover'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

const props = defineProps<PopoverRootProps>()
const emit = defineEmits<PopoverRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)

defineOptions({ inheritAttrs: false })
</script>

<template>
  <Popover.Root
    v-bind="forwardedProps"
  >
    <slot />
  </Popover.Root>
</template>
