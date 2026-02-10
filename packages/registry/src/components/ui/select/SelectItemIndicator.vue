<script setup lang="ts">
import type { SelectItemIndicatorProps } from '@ark-ui/vue/select'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { CheckIcon } from 'lucide-vue-next'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SelectItemIndicatorProps {}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.ItemIndicator
    v-bind="forwardedProps"
    :class="cn(
      'pointer-events-none absolute right-2 flex size-4 items-center justify-center',
      props.class,
    )"
  >
    <slot>
      <CheckIcon data-part="icon" class="size-4" />
    </slot>
  </Select.ItemIndicator>
</template>
