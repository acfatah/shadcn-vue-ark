<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmptyMediaProps, EmptyMediaVariants } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { emptyMediaVariants } from './variant'

interface Props extends EmptyMediaProps {
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['class', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    v-bind="forwardedProps"
    data-scope="empty"
    data-part="media"
    :data-variant="props.variant"
    :class="cn(emptyMediaVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </ark.div>
</template>
