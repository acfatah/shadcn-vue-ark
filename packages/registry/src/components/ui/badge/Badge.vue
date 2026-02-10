<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { BadgeVariants } from '.'

import { badgeVariants } from '.'

interface Props extends PolymorphicProps {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, ['class', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.span
    v-bind="forwardedProps"
    data-scope="badge"
    :class="cn(
      badgeVariants({ variant: props.variant }),
      props.class,
    )"
  >
    <slot />
  </ark.span>
</template>
