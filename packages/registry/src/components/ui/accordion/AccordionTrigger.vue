<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Accordion.ItemTrigger
    v-bind="delegatedProps"
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
        <Icon
          icon="lucide-chevron-down"
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
