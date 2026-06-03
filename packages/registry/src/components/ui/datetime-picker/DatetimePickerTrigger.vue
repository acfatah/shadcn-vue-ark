<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../button'
import PopoverTrigger from '../popover/PopoverTrigger.vue'
import { useDatetimePickerContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const ctx = useDatetimePickerContext()!

const formattedDatetime = computed(() => {
  if (!ctx.datetimeValue.value)
    return ctx.placeholder.value

  const df = new DateFormatter(
    ctx.locale.value,
    ctx.formatOptions.value,
  )

  return df.format(
    ctx.datetimeValue.value.toDate(getLocalTimeZone()),
  )
})
</script>

<template>
  <PopoverTrigger
    :disabled="ctx.disabled.value"
    :aria-invalid="ctx.invalid.value || undefined"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      `h-11 w-[280px] justify-start border-input text-left font-normal`,
      !ctx.datetimeValue.value && 'text-muted-foreground',
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
    <slot
      :datetime="ctx.datetimeValue.value"
      :formatted="formattedDatetime"
    >
      <CalendarIcon class="text-muted-foreground" />
      {{ formattedDatetime }}
    </slot>
  </PopoverTrigger>
</template>
