<script setup lang="ts">
import type { AccordionItemTriggerProps } from '@ark-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'

import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends AccordionItemTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Accordion.ItemTrigger
    v-bind="forwardedProps"
    :class="cn(
      `
        flex w-full flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm
        font-medium transition-all outline-none
        hover:underline
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        disabled:pointer-events-none disabled:opacity-50
        [[data-state=open]&_svg]:rotate-180
      `,
      props.class,
    )"
  >
    <slot />
    <Accordion.ItemIndicator class="flex items-center">
      <slot name="indicator">
        <ChevronDownIcon
          data-part="icon"
          :class="cn(
            `
              pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground
              transition-transform duration-200
            `,
          )"
        />
      </slot>
    </Accordion.ItemIndicator>
  </Accordion.ItemTrigger>
</template>
