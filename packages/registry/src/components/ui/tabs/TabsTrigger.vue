<script setup lang="ts">
import type { TabTriggerProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends TabTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tabs.Trigger
    data-scope="tabs"
    data-part="trigger"
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(
      `
        inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border
        border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground
        transition-[color,box-shadow]
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        focus-visible:outline-1 focus-visible:outline-ring
        disabled:pointer-events-none disabled:opacity-50
        data-selected:bg-background data-selected:shadow-sm
        dark:text-muted-foreground
        dark:data-selected:border-input dark:data-selected:bg-input/30
        dark:data-selected:text-foreground
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
      `,
      props.class,
    )"
  >
    <slot />
  </Tabs.Trigger>
</template>
