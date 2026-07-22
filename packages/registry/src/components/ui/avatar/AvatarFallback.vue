<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AvatarFallbackProps } from './types'

import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useAvatarContext } from './context'
import { shape as shapeVariant, size as sizeVariant } from './variant'

interface Props extends AvatarFallbackProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const { shape, size } = useAvatarContext()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Avatar.Fallback
    v-bind="forwardedProps"
    :class="cn(
      `flex size-full items-center justify-center bg-muted select-none`,
      shape ? shapeVariant[shape] : shapeVariant.round,
      size ? sizeVariant[size] : sizeVariant.md,
      props.class,
    )"
  >
    <slot />
  </Avatar.Fallback>
</template>
