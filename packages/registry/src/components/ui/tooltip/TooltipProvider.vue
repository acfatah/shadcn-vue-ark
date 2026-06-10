<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'

import { useForwardProps } from '@/composables/useForwardProps'

import type { TooltipRootProviderProps } from './types'

const props = defineProps<TooltipRootProviderProps>()
const forwardedProps = useForwardProps<TooltipRootProviderProps>(props)
</script>

<template>
  <Tooltip.RootProvider v-bind="forwardedProps">
    <slot />
  </Tooltip.RootProvider>
</template>
