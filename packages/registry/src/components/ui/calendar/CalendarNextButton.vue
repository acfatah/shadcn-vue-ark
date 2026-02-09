<script lang="ts" setup>
import type { DatePickerNextTriggerProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'
import { ChevronRight } from 'lucide-vue-next'

import { buttonVariants } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerNextTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.NextTrigger
    data-scope="calendar"
    data-part="next-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      `
        size-7 bg-transparent p-0 opacity-50
        hover:opacity-100
      `,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRight class="size-4" />
    </slot>
  </DatePicker.NextTrigger>
</template>
