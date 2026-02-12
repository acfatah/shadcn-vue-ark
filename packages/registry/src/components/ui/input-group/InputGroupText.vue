<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <span
    v-bind="forwardedProps"
    data-scope="input-group"
    data-part="text"
    :class="cn(
      `
        flex items-center gap-2 text-sm text-muted-foreground
        [&_svg]:pointer-events-none
        [&_svg:not([class*=\'size-\'])]:size-4
      `,
      props.class,
    )"
  >
    <slot />
  </span>
</template>
