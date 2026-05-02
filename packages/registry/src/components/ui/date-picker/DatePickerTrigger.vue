<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../button'
import PopoverTrigger from '../popover/PopoverTrigger.vue'
import { useDatePickerContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const ctx = useDatePickerContext()!

const formattedDate = computed(() => {
  if (!ctx.dateValue.value)
    return ctx.placeholder.value

  const df = new DateFormatter(ctx.locale.value, ctx.formatOptions.value)

  return df.format(ctx.dateValue.value.toDate(getLocalTimeZone()))
})
</script>

<template>
  <PopoverTrigger
    :disabled="ctx.disabled.value"
    :aria-invalid="ctx.invalid.value || undefined"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-11 w-[240px] justify-start border-input text-left font-normal',
      !ctx.dateValue.value && 'text-muted-foreground',
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
    <slot :date="ctx.dateValue.value" :formatted="formattedDate">
      <CalendarIcon class="text-muted-foreground" />
      {{ formattedDate }}
    </slot>
  </PopoverTrigger>
</template>
