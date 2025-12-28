<script setup lang="ts">
import type { AccordionRootProps } from '@ark-ui/vue/accordion'
import { Accordion } from '@ark-ui/vue/accordion'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

const props = defineProps<AccordionRootProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Accordion.Root v-bind="forwardedProps">
    <slot />
  </Accordion.Root>
</template>
