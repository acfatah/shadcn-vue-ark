<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Checkbox.Control
    v-bind="delegatedProps"
    :class="cn(
      // Currently rounded-lg produces different results from rounded-[4px] here
      `
        size-4 rounded-[4px] border border-input shadow-xs transition-shadow outline-none
        disabled:cursor-not-allowed disabled:opacity-50
        data-disabled:cursor-not-allowed data-disabled:opacity-50
        data-[state=checked]:border-primary data-[state=checked]:bg-primary
        data-[state=checked]:text-primary-foreground
      `,
      `group-focus-within:border-ring group-focus-within:ring-[3px] group-focus-within:ring-ring/50`,
      props.class,
    )"
  >
    <slot />
  </Checkbox.Control>
</template>
