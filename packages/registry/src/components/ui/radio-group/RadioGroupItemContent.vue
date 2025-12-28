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
  <div
    data-scope="radio-group"
    data-part="item-content"
    v-bind="forwardedProps"
    :class="cn(
      'flex flex-col gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
