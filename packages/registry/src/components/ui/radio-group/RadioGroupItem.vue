<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  value: string
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <RadioGroup.Item
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(`
      group flex items-start gap-3
      disabled:opacity-50
    `, props.class)"
  >
    <slot />
  </RadioGroup.Item>
</template>
