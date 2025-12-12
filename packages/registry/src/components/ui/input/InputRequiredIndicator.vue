<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <span
    data-scope="input"
    data-part="required-indicator"
    v-bind="forwardedProps"
    :class="cn('text-xs leading-none font-normal text-destructive', props.class)"
  >
    <slot>*</slot>
  </span>
</template>
