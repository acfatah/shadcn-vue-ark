<script setup lang="ts">
import type { TabListProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends TabListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tabs.List
    data-scope="tabs"
    data-part="list"
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px]
        text-muted-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </Tabs.List>
</template>
