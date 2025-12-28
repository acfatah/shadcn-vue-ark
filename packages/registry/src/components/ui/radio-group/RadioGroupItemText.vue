<script setup lang="ts">
import type { RadioGroupItemTextProps } from '@ark-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupItemTextProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <RadioGroup.ItemText
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
  </RadioGroup.ItemText>
</template>
