<script lang="ts" setup>
import type { DatePickerPrevTriggerProps } from '@ark-ui/vue/date-picker'
import type { HTMLAttributes } from 'vue'

import { DatePicker } from '@ark-ui/vue/date-picker'
import { reactiveOmit } from '@vueuse/core'
import { ChevronLeft } from 'lucide-vue-next'

import { buttonVariants } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends DatePickerPrevTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <DatePicker.PrevTrigger
    data-scope="calendar"
    data-part="prev-button"
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
      <ChevronLeft class="size-4" />
    </slot>
  </DatePicker.PrevTrigger>
</template>
