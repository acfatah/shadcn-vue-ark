<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'

import { Popover } from '@ark-ui/vue/popover'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

defineOptions({ inheritAttrs: false })

const props = defineProps<PopoverRootProps>()
const emit = defineEmits<PopoverRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <Popover.Root
    v-bind="forwardedProps"
  >
    <slot />
  </Popover.Root>
</template>
