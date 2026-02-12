<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import type { ButtonProps, ButtonVariants } from '@/components/ui/button'

import { Button } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { InputGroupButtonVariants } from '.'

import { inputGroupButtonVariants } from '.'

interface Props extends Omit<ButtonProps, 'class' | 'scope' | 'size' | 'variant'> {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'xs',
  variant: 'ghost',
})

const delegatedProps = reactiveOmit(props, ['class', 'size', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Button
    v-bind="forwardedProps"
    scope="input-group"
    data-part="button"
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
