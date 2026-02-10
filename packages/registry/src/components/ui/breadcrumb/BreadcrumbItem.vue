<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <li
    v-bind="forwardedProps"
    data-scope="breadcrumb"
    data-part="item"
    :class="cn(
      `
        inline-flex items-center gap-1.5 outline-none
        focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50
        [&_[data-scope=dropdown-menu][data-part=trigger]]:rounded-xs
      `,
      props.class,
    )"
  >
    <slot />
  </li>
</template>
