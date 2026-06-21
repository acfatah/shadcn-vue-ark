<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import type { TimePickerTriggerProps } from './types'

import { buttonVariants } from '../button'
import PopoverTrigger from '../popover/PopoverTrigger.vue'
import { useTimePickerContext } from './context'
import { formatTime } from './utils'

const props = defineProps<TimePickerTriggerProps>()

const ctx = useTimePickerContext()!

const formattedTime = computed(() => formatTime(ctx.timeValue.value, {
  hourCycle: ctx.hourCycle.value,
  placeholder: ctx.placeholder.value,
}))
</script>

<template>
  <PopoverTrigger
    :disabled="ctx.disabled.value"
    :aria-invalid="ctx.invalid.value || undefined"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'h-11 w-[240px] justify-start border-input text-left font-normal',
      !ctx.timeValue.value && 'text-muted-foreground',
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
    <slot :time="ctx.timeValue.value" :formatted="formattedTime">
      <Clock class="text-muted-foreground" />
      {{ formattedTime }}
    </slot>
  </PopoverTrigger>
</template>
