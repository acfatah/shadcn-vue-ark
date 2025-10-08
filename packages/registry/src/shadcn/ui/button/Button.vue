<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'
import type { ButtonVariant } from '.'
import { buttonVariants } from '.'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant['variant']
  size?: ButtonVariant['size']
  class?: HTMLAttributes['class']
  as?: string | object
  asChild?: boolean
}>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
  as: 'button',
  class: '',
})

const attrs = useAttrs()
const resolvedTag = computed(() => props.asChild ? props.as : 'button')
</script>

<template>
  <component
    :is="resolvedTag"
    data-slot="button"
    v-bind="attrs"
    :class="cn(buttonVariants({
      variant: props.variant,
      size: props.size,
      class: props.class,
    }))"
  >
    <slot />
  </component>
</template>
