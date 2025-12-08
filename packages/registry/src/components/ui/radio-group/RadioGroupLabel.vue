<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <RadioGroup.Label
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm leading-none font-medium select-none
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </RadioGroup.Label>
</template>
