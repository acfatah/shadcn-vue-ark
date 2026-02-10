<script setup lang="ts">
import type { SelectClearTriggerProps } from '@ark-ui/vue/select'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { XIcon } from 'lucide-vue-next'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SelectClearTriggerProps {}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Select.ClearTrigger
    v-bind="forwardedProps"
    :class="cn(
      `
        absolute right-2 flex items-center justify-center rounded-sm outline-none
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        disabled:pointer-events-none disabled:opacity-50
      `,
      props.class,
    )"
    aria-label="Clear selection"
    @keydown.stop
  >
    <slot>
      <XIcon data-part="icon" class="size-4" />
    </slot>
  </Select.ClearTrigger>
</template>
