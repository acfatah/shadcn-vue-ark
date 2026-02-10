<script setup lang="ts">
import type { TooltipRootProviderProps } from '@ark-ui/vue/tooltip'

import { Tooltip } from '@ark-ui/vue/tooltip'

import { useForwardProps } from '@/composables/useForwardProps'

const props = defineProps<TooltipRootProviderProps>()
const forwardedProps = useForwardProps<TooltipRootProviderProps>(props)
</script>

<template>
  <Tooltip.RootProvider v-bind="forwardedProps">
    <slot />
  </Tooltip.RootProvider>
</template>
