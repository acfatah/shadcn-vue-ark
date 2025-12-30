<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { Component, HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import type { ItemVariants } from '.'
import { itemVariants } from '.'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
  variant?: ItemVariants['variant']
  size?: ItemVariants['size']
  as?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  as: ark.div,
})

const delegatedProps = reactiveOmit(props, ['class', 'variant', 'size'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="as"
    data-scope="item"
    :class="cn(
      itemVariants({ variant, size }),
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </component>
</template>
