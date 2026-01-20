<script setup lang="ts">
import type { AccordionItemProps } from '@ark-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends AccordionItemProps {
  value: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Accordion.Item
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(`
      border-b
      last:border-b-0
    `, props.class)"
  >
    <slot />
  </Accordion.Item>
</template>
