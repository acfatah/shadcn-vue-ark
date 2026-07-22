<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AccordionRootEmits, AccordionRootProps } from './types'

import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends AccordionRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<AccordionRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Accordion.Root
    v-bind="forwardedProps"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </Accordion.Root>
</template>
