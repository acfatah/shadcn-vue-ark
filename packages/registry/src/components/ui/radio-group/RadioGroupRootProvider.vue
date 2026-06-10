<script setup lang="ts">
import { RadioGroup } from '@ark-ui/vue/radio-group'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { RadioGroupRootProviderProps } from './types'

const props = defineProps<RadioGroupRootProviderProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <RadioGroup.RootProvider
    :value="props.value"
    v-bind="forwardedProps"
  >
    <slot />
  </RadioGroup.RootProvider>
</template>
