<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <div
    data-scope="avatar-group"
    v-bind="forwardedProps"
    :class="cn(`
      flex -space-x-2
      *:data-[scope=avatar]:ring-2 *:data-[scope=avatar]:ring-background
      *:data-[scope=avatar]:grayscale
    `, props.class)"
  >
    <slot />
  </div>
</template>
