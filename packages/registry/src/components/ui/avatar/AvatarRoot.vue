<script setup lang="ts">
import type { AvatarRootProps } from '@ark-ui/vue/avatar'
import type { HTMLAttributes } from 'vue'

import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends AvatarRootProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Avatar.Root
    v-bind="forwardedProps"
    :class="cn(
      `relative flex size-8 shrink-0 overflow-hidden rounded-full`,
      props.class,
    )"
  >
    <slot />
  </Avatar.Root>
</template>
