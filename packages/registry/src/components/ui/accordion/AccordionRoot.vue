<script setup lang="ts">
import type { AccordionRootProps } from '@ark-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends AccordionRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Accordion.Root
    v-bind="forwardedProps"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </Accordion.Root>
</template>
