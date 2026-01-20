<script setup lang="ts">
import type { RadioGroupRootProviderProps } from '@ark-ui/vue/radio-group'

import { RadioGroup } from '@ark-ui/vue/radio-group'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

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
