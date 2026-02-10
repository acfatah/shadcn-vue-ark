<script setup lang="ts">
import type { CollapsibleContentProps } from '@ark-ui/vue/collapsible'
import type { HTMLAttributes } from 'vue'

import { Collapsible } from '@ark-ui/vue/collapsible'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends CollapsibleContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Collapsible.Content
    v-bind="forwardedProps"
    :class="cn(
      `
        overflow-hidden text-sm
        data-[state=closed]:animate-collapsible-up
        data-[state=open]:animate-collapsible-down
      `,
      props.class,
    )"
  >
    <slot />
  </Collapsible.Content>
</template>
