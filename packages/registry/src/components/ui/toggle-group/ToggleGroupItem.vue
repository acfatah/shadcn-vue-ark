<script setup lang="ts">
import type { ToggleGroupItemProps } from '@ark-ui/vue/toggle-group'
import type { HTMLAttributes } from 'vue'

import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { reactiveOmit } from '@vueuse/core'
import { inject } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import type { ToggleVariants } from '@/components/ui/toggle'

import { toggleVariants } from '@/components/ui/toggle'

interface ToggleGroupContext {
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  spacing?: number
}

interface Props extends ToggleGroupItemProps {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}

const props = defineProps<Props>()

const context = inject<ToggleGroupContext>('toggleGroup', {})

const delegatedProps = reactiveOmit(props, ['class', 'size', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ToggleGroup.Item
    v-slot="slotProps"
    data-slot="toggle-group-item"
    :data-variant="context.variant || props.variant"
    :data-size="context.size || props.size"
    :data-spacing="context.spacing"
    v-bind="forwardedProps"
    :class="cn(
      toggleVariants({
        variant: context.variant || props.variant,
        size: context.size || props.size,
      }),
      'w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10',
      'data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none',
      'data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md',
      'data-[spacing=0]:data-[variant=outline]:border-l-0',
      'data-[spacing=0]:data-[variant=outline]:first:border-l',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </ToggleGroup.Item>
</template>
