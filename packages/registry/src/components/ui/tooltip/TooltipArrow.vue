<script setup lang="ts">
import type { TooltipArrowProps } from '@ark-ui/vue/tooltip'
import type { HTMLAttributes } from 'vue'

import { Tooltip } from '@ark-ui/vue/tooltip'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends TooltipArrowProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tooltip.Arrow
    v-bind="{ ...$attrs, ...forwardedProps }"
    data-scope="tooltip"
    data-part="arrow"
    :class="cn(
      '[--arrow-background:var(--foreground)] [--arrow-size:8px]',
      `
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95
      `,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      props.class,
    )"
  >
    <Tooltip.ArrowTip
      data-scope="tooltip"
      data-part="arrow-tip"
    />
  </Tooltip.Arrow>
</template>
