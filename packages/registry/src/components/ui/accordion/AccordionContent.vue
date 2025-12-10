<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
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
      props.class,
    )"
  >
    <div
      data-scope="accordion"
      data-part="content-wrapper"
      class="pt-0 pb-4"
    >
      <slot />
    </div>
  </Accordion.ItemContent>
</template>
