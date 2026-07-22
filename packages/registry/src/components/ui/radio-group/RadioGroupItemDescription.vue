<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { RadioGroupItemDescriptionProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupItemDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="radio-group"
    data-part="item-description"
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm text-muted-foreground
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
