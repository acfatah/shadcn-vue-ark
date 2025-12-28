<script setup lang="ts">
import type { RadioGroupItemProps } from '@ark-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupItemProps {
  value: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <RadioGroup.Item
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(`
      group flex items-start gap-3
      data-disabled:opacity-50
    `, props.class)"
  >
    <slot />
  </RadioGroup.Item>
</template>
