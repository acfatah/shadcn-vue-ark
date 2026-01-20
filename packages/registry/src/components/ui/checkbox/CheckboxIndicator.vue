<script setup lang="ts">
import type { CheckboxIndicatorProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { CheckIcon } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends CheckboxIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Indicator v-bind="forwardedProps">
    <slot>
      <CheckIcon
        data-part="icon"
        :class="cn(
          `grid size-3.5 place-content-center text-current transition-none`,
          props.class,
        )"
      />
    </slot>
  </Checkbox.Indicator>
</template>
