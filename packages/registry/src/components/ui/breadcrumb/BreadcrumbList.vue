<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ol
    v-bind="forwardedProps"
    data-scope="breadcrumb"
    data-part="list"
    :class="cn(
      `
        flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground
        sm:gap-2.5
      `,
      props.class,
    )"
  >
    <slot />
  </ol>
</template>
