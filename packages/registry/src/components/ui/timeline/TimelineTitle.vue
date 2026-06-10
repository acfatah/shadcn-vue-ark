<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    data-scope="timeline"
    data-part="title"
    v-bind="delegatedProps"
    :class="cn(
      'text-sm leading-none font-medium',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
