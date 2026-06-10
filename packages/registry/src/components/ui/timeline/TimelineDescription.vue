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
  <ark.p
    data-scope="timeline"
    data-part="description"
    v-bind="delegatedProps"
    :class="cn(
      'text-sm text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </ark.p>
</template>
