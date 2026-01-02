<script setup lang="ts">
import type { SelectTriggerProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import { useSelectContext } from '.'
import SelectClearTrigger from './SelectClearTrigger.vue'
import SelectIndicator from './SelectIndicator.vue'

interface Props extends SelectTriggerProps {
  class?: HTMLAttributes['class']
  clearable?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['class', 'clearable'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
const selectContext = useSelectContext()
useForwardExpose()
</script>

<template>
  <Select.Control>
    <Select.Trigger
      v-bind="forwardedProps"
      :class="cn(
        `
          relative flex w-full items-center justify-between gap-2 rounded-md border border-input
          bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow]
          outline-none
          dark:bg-input/30 dark:hover:bg-input/50
        `,
        `disabled:pointer-events-none disabled:opacity-50`,
        `
          aria-invalid:border-destructive aria-invalid:ring-destructive/20
          data-invalid:border-destructive data-invalid:ring-destructive/20
          dark:aria-invalid:ring-destructive/40 dark:data-invalid:ring-destructive/40
        `,
        `
          focus:border-ring focus:ring-[3px] focus:ring-ring/50
          focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        `,
        'data-placeholder-shown:text-muted-foreground',
        props.class,
      )"
    >
      <slot />
      <template v-if="props.clearable">
        <SelectIndicator v-show="selectContext.empty" />
        <SelectClearTrigger v-show="!selectContext.empty" />
      </template>

      <template v-else>
        <SelectIndicator />
      </template>
    </Select.Trigger>
  </Select.Control>
</template>
