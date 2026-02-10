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
  <span
    v-bind="forwardedProps"
    data-scope="breadcrumb"
    data-part="page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn(
      'font-normal text-foreground',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
