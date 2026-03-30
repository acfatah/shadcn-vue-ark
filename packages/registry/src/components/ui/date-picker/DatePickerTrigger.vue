<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import Button from '../button/Button.vue'
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
  <PopoverTrigger as-child>
    <Button
      variant="outline"
      data-scope="date-picker"
      data-part="trigger"
      :disabled="ctx.disabled.value"
      :class="cn(
        'w-[240px] justify-start text-left font-normal',
        !ctx.dateValue.value && 'text-muted-foreground',
        props.class,
      )"
    >
      <slot :date="ctx.dateValue.value" :formatted="formattedDate">
        <CalendarIcon />
        {{ formattedDate }}
      </slot>
    </Button>
  </PopoverTrigger>
</template>
