<script setup lang="ts">
import type { AccordionItemContentProps } from '@ark-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends AccordionItemContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Accordion.ItemContent
    v-bind="forwardedProps"
    :class="cn(
      `
        overflow-hidden text-sm
        data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down
      `,
      `*:data-[part=content-wrapper]:pt-0 *:data-[part=content-wrapper]:pb-4`,
      props.class,
    )"
  >
    <div data-scope="accordion" data-part="content-wrapper">
      <slot />
    </div>
  </Accordion.ItemContent>
</template>
