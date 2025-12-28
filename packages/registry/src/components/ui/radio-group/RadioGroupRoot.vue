<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from '@ark-ui/vue/radio-group'
import type { HTMLAttributes } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends RadioGroupRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<RadioGroupRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <RadioGroup.Root
    v-bind="forwardedProps"
    :class="cn(
      `
        group flex flex-col gap-3
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </RadioGroup.Root>
</template>
