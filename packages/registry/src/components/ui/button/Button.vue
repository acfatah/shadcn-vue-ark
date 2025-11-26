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

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
})

const delegatedProps = reactiveOmit(props, [
  'class',
  'asChild',
  'disabled',
  'loading',
  'size',
  'variant',
])

const forwardedProps = useForwardProps(delegatedProps)

const isDisabled = computed(() => props.disabled || props.loading)
const nativeDisabled = computed(() => (props.asChild ? undefined : isDisabled.value))
const ariaDisabled = computed(() => (props.asChild && isDisabled.value ? true : undefined))
const dataDisabled = computed(() => (props.asChild && isDisabled.value ? '' : undefined))
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : 'button'"
    data-scope="button"
    v-bind="forwardedProps"
    :disabled="nativeDisabled"
    :aria-disabled="ariaDisabled"
    :data-disabled="dataDisabled"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
