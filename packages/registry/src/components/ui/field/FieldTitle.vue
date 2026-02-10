<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <p
    data-scope="field"
    data-part="title"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex w-fit items-center gap-2 text-sm/snug font-medium
        group-data-[disabled=true]/field:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </p>
</template>
