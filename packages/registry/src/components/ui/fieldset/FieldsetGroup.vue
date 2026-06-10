<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    v-bind="delegatedProps"
    :class="cn(
      `group/field-group @container/field-group flex w-full flex-col gap-4`,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
