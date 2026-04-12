<script setup lang="ts">
import type { AvatarRootProps } from '@ark-ui/vue/avatar'
import type { HTMLAttributes } from 'vue'

import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { size } from './variant'

import { provideAvatarContext } from './context'
import { avatarVariants } from './variant'

interface Props extends AvatarRootProps {
  shape?: 'round' | 'square'
  size?: keyof typeof size
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'round',
  size: 'md',
})

provideAvatarContext({ shape: props.shape, size: props.size })

const delegatedProps = reactiveOmit(props, ['class', 'shape', 'size'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Avatar.Root
    v-bind="forwardedProps"
    :class="cn(
      avatarVariants({ shape: props.shape, size: props.size }),
      props.class,
    )"
  >
    <slot />
  </Avatar.Root>
</template>
