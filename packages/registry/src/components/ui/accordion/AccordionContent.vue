<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Accordion.ItemContent
    v-bind="delegatedProps"
    :class="cn(
      `
        overflow-hidden text-sm
        data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down
      `,
    )"
  >
    <div :class="cn('pt-0 pb-4', props.class)">
      <slot />
    </div>
  </Accordion.ItemContent>
</template>
