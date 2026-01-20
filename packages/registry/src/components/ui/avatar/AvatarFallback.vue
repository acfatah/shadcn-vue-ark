<script setup lang="ts">
import type { AvatarFallbackProps } from '@ark-ui/vue/avatar'
import type { HTMLAttributes } from 'vue'

import { Avatar } from '@ark-ui/vue/avatar'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends AvatarFallbackProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Avatar.Fallback
    v-bind="forwardedProps"
    :class="cn(
      `flex size-full items-center justify-center rounded-full bg-muted`,
      props.class,
    )"
  >
    <slot />
  </Avatar.Fallback>
</template>
