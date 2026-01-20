<script setup lang="ts">
import type { DescriptionProps } from '@/components/ui/description'

import { Description } from '@/components/ui/description'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

const props = defineProps<DescriptionProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Description
    data-scope="switch"
    data-part="description"
    v-bind="forwardedProps"
  >
    <slot />
  </Description>
</template>
