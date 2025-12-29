<script setup lang="ts">
import type { RadioGroupIndicatorProps } from '@ark-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="radio-group"
    data-part="indicator"
    v-bind="forwardedProps"
    class="transition-none!"
  >
    <div
      data-scope="radio-group"
      data-part="indicator-control"
      :class="cn(
        `
          hidden size-2 rounded-full bg-primary
          group-has-data-disabled:opacity-50
          group-data-[state=checked]:block
        `,
        props.class,
      )"
    />
  </ark.div>
</template>
