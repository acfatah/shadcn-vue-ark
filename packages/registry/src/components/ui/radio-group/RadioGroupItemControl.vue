<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'
import RadioGroupIndicator from './RadioGroupIndicator.vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RadioGroup.ItemControl
    v-bind="delegatedProps"
    :class="cn(
      `
        group flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border
        border-input text-primary shadow-xs transition-[color,box-shadow] outline-none
        disabled:opacity-50
        dark:bg-input/30
      `,
      `
        data-[state=checked]:group-focus-within:border-ring
        data-[state=checked]:group-focus-within:ring-[3px]
        data-[state=checked]:group-focus-within:ring-ring/50
      `,
      props.class,
    )"
  >
    <slot>
      <RadioGroupIndicator />
    </slot>
  </RadioGroup.ItemControl>
</template>
