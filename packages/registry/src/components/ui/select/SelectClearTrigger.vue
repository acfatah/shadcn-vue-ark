<script setup lang="ts">
import type { SelectClearTriggerProps } from '@ark-ui/vue/select'
import { Select } from '@ark-ui/vue/select'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { cn } from '@/lib/utils'

interface Props extends SelectClearTriggerProps {
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:x',
})

const delegatedProps = reactiveOmit(props, ['class', 'icon'])
useForwardExpose()
</script>

<template>
  <Select.ClearTrigger
    v-bind="delegatedProps"
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
      <Icon data-part="icon" :icon="props.icon" />
    </slot>
  </Select.ClearTrigger>
</template>
