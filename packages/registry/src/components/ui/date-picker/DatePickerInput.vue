<script setup lang="ts">
import type { DatePickerInputProps } from './types'

import { computed } from 'vue'

import { fromDateValue, toDateValue } from '@/lib/internationalized-date'
import { cn } from '@/lib/utils'

import { useDatePickerContext } from './context'

const props = defineProps<DatePickerInputProps>()

const ctx = useDatePickerContext()!

const inputValue = computed(() => fromDateValue(ctx.dateValue.value))
const ariaInvalid = computed(() => (props.invalid || ctx.invalid.value) ? 'true' : undefined)
const disabled = computed(() => props.disabled || ctx.disabled.value || undefined)

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement

  ctx.setDate(toDateValue(target.value))
}
</script>

<template>
  <input
    :id="props.id"
    :name="props.name"
    :value="inputValue"
    type="date"
    data-scope="date-picker"
    data-part="input"
    :autocomplete="props.autocomplete"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :required="props.required || undefined"
    :readonly="props.readonly || undefined"
    :disabled="disabled"
    :aria-invalid="ariaInvalid"
    :class="cn(
      `
        h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base
        shadow-xs transition-[color,box-shadow] outline-none
        selection:bg-primary selection:text-primary-foreground
        placeholder:text-muted-foreground
        disabled:pointer-events-none disabled:opacity-50
        md:text-sm
        dark:bg-input/30
      `,
      `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
    @change="handleChange"
  >
</template>

<style lang="css">
input[data-scope='date-picker'][data-part='input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.4);
}

html.dark input[data-scope='date-picker'][data-part='input']::-webkit-calendar-picker-indicator {
  filter: brightness(0.7);
}
</style>
