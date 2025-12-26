<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
useForwardExpose()
</script>

<template>
  <div
    data-scope="select"
    data-part="separator"
    v-bind="delegatedProps"
    :class="cn(
      '-mx-1 my-1 h-px bg-border',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
