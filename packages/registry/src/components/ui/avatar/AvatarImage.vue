<script setup lang="ts">
import type { AvatarImageProps } from '@ark-ui/vue/avatar'

import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useAvatarContext } from './context'
import {
  shape as shapeVariant,
  size as sizeVariant,
} from './variant'

interface Props extends AvatarImageProps {
  class?: string
}

const props = defineProps<Props>()
const { shape, size } = useAvatarContext()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Avatar.Image
    v-bind="forwardedProps"
    :class="cn(
      `aspect-square size-full`,
      shape ? shapeVariant[shape] : shapeVariant.round,
      size ? sizeVariant[size] : sizeVariant.md,
      props.class,
    )"
  />
</template>
