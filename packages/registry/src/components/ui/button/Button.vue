<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { Dynamic } from '@/composables/dynamic'
import { useForwardProps } from '@/composables/use-forward-props'
import { cn } from '@/lib/utils'
import type { ButtonVariants } from '.'
import { buttonVariants } from '.'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
  disabled?: boolean
  loading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'asChild',
  'disabled',
  'loading',
  'size',
  'variant',
])

const forwardedProps = useForwardProps(delegatedProps)
const nativeDisabled = computed(() => props.disabled || props.loading || undefined)
const ariaDisabled = computed(() => (nativeDisabled.value ? 'true' : undefined))
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : 'button'"
    data-scope="button"
    v-bind="forwardedProps"
    :disabled="nativeDisabled"
    :aria-disabled="ariaDisabled"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
