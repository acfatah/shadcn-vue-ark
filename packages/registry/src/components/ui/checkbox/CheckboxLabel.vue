<script setup lang="ts">
import type { CheckboxLabelProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends CheckboxLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Label
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
  </Checkbox.Label>
</template>
