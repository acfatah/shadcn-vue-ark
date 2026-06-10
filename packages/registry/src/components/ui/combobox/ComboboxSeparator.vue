<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { ComboboxSeparatorProps } from './types'

interface Props extends ComboboxSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="combobox"
    data-part="separator"
    v-bind="forwardedProps"
    :class="cn(
      '-mx-1 h-px border-border',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
