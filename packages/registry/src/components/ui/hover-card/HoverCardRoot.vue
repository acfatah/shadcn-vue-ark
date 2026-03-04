<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from '@ark-ui/vue/hover-card'

import { HoverCard } from '@ark-ui/vue/hover-card'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

const props = defineProps<HoverCardRootProps>()
const emit = defineEmits<HoverCardRootEmits>()
const forwardedProps = useForwardPropsEmits(props, emit)
</script>

<template>
  <HoverCard.Root v-bind="forwardedProps">
    <slot />
  </HoverCard.Root>
</template>
