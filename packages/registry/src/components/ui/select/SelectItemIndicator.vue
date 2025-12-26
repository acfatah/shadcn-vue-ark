<script setup lang="ts">
import type { SelectItemIndicatorProps } from '@ark-ui/vue/select'
import { Select } from '@ark-ui/vue/select'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { cn } from '@/lib/utils'

interface Props extends SelectItemIndicatorProps {
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:check',
})

const delegatedProps = reactiveOmit(props, ['class', 'icon'])
useForwardExpose()
</script>

<template>
  <Select.ItemIndicator
    v-bind="delegatedProps"
    :class="cn(
      'pointer-events-none absolute right-2 flex size-4 items-center justify-center',
      props.class,
    )"
  >
    <slot>
      <Icon data-part="icon" :icon="props.icon" class="size-4" />
    </slot>
  </Select.ItemIndicator>
</template>
