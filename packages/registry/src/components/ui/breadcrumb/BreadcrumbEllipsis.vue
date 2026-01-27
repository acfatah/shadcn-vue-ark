<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { MoreHorizontal } from 'lucide-vue-next'

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
  <span
    v-bind="forwardedProps"
    data-scope="breadcrumb"
    data-part="ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn(
      'flex size-9 items-center justify-center',
      props.class,
    )"
  >
    <slot>
      <MoreHorizontal class="size-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
