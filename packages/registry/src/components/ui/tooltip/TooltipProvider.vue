<script setup lang="ts">
import type { TooltipRootProviderProps } from '@ark-ui/vue/tooltip'

import { Tooltip } from '@ark-ui/vue/tooltip'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

const props = defineProps<TooltipRootProviderProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Tooltip.RootProvider v-bind="forwardedProps">
    <slot />
  </Tooltip.RootProvider>
</template>
