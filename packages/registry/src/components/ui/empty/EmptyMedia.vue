<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import type { EmptyMediaVariants } from '.'

import { emptyMediaVariants } from '.'

interface Props extends PolymorphicProps {
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
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), props.class)"
  >
    <slot />
  </ark.div>
</template>
