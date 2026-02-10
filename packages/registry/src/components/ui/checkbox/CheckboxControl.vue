<script setup lang="ts">
import type { CheckboxControlProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends CheckboxControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Control
    v-bind="forwardedProps"
    :class="cn(
      // Currently rounded-lg produces different results from rounded-[4px] here
      `
        mt-0.5 size-4 min-w-4 rounded-[4px] border border-input shadow-xs transition-shadow
        outline-none
      `,
      `
        data-[state=checked]:border-primary data-[state=checked]:bg-primary
        data-[state=checked]:text-primary-foreground
        data-[state=unchecked]:data-invalid:border-destructive/50
      `,
      `
        group-focus-within:border-ring group-focus-within:ring-[3px] group-focus-within:ring-ring/50
        data-invalid:group-focus-within:ring-destructive/20
        dark:data-invalid:group-focus-within:ring-destructive/40
      `,
      props.class,
    )"
  >
    <slot />
  </Checkbox.Control>
</template>
