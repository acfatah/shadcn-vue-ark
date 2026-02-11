<script lang="ts" setup>
import type { DatePickerTableCellTriggerProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'

import { buttonVariants } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerTableCellTriggerProps {
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.TableCellTrigger
    data-scope="calendar"
    data-part="cell-trigger"
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      `
        size-8 cursor-default p-0 font-normal text-foreground
        aria-selected:opacity-100
      `,
      `
        [&[data-today]:not([data-selected])]:bg-accent
        [&[data-today]:not([data-selected])]:text-accent-foreground
      `,
      // Selected
      `
        data-selected:bg-primary data-selected:text-primary-foreground data-selected:opacity-100
        data-selected:hover:bg-primary data-selected:hover:text-primary-foreground
        data-selected:focus:bg-primary data-selected:focus:text-primary-foreground
      `,
      // Disabled
      'data-disabled:text-muted-foreground data-disabled:opacity-50',
      // Unavailable
      `
        data-[unavailable]:text-destructive-foreground
        data-unavailable:line-through
      `,
      // Outside months
      'data-outside-view:text-muted-foreground',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </DatePicker.TableCellTrigger>
</template>
