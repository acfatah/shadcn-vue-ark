<script setup lang="ts">
import type { AccordionRootProps } from '@ark-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends AccordionRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Accordion.Root v-bind="forwardedProps">
    <slot />
  </Accordion.Root>
</template>
