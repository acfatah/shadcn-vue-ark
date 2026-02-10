<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { ChevronRight } from 'lucide-vue-next'

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
    data-part="separator"
    role="presentation"
    aria-hidden="true"
    :class="cn(
      '[&>svg]:size-3.5',
      props.class,
    )"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
