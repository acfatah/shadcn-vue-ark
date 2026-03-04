<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from '@ark-ui/vue/dialog'

import { Dialog } from '@ark-ui/vue/dialog'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

const props = defineProps<DialogRootProps>()
const emit = defineEmits<DialogRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <Dialog.Root v-bind="forwardedProps">
    <slot />
  </Dialog.Root>
</template>
