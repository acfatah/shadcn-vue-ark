<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PinInputSeparatorProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { Minus } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PinInputSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.span
    v-bind="forwardedProps"
    data-scope="pin-input"
    data-part="separator"
    :class="cn('[&>svg]:size-3.5', props.class)"
  >
    <slot>
      <Minus />
    </slot>
  </ark.span>
</template>
