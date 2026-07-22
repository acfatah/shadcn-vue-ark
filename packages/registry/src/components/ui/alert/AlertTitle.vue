<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertTitleProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends AlertTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    data-scope="alert"
    data-part="title"
    v-bind="delegatedProps"
    :class="cn(
      'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
