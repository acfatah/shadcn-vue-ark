<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

import { computed, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

import type { LayoutTypes } from './types'

import PopoverRoot from '../popover/PopoverRoot.vue'
import { DatePickerProvider } from './context'

interface Props {
  class?: HTMLAttributes['class']
  modelValue?: DateValue
  defaultValue?: DateValue
  layout?: LayoutTypes
  placeholder?: string
  formatOptions?: Intl.DateTimeFormatOptions
  locale?: string
  closeOnSelect?: boolean
  disabled?: boolean
  invalid?: boolean
  calendarProps?: Record<string, any>
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: undefined,
  layout: undefined,
  placeholder: 'Pick a date',
  formatOptions: () => ({ dateStyle: 'long' }),
  locale: 'en-US',
  closeOnSelect: true,
  disabled: false,
  invalid: false,
  calendarProps: () => ({}),
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 2,
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue | undefined]
}>()

const dateValue = ref<DateValue | undefined>(props.defaultValue)
const openValue = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    dateValue.value = val
  },
)

function setDate(val: DateValue | undefined) {
  dateValue.value = val
  emit('update:modelValue', val)

  if (props.closeOnSelect)
    openValue.value = false
}

function setOpen(val: boolean) {
  openValue.value = val
}

DatePickerProvider({
  dateValue,
  layout: computed(() => props.layout),
  placeholder: computed(() => props.placeholder),
  formatOptions: computed(() => props.formatOptions),
  locale: computed(() => props.locale),
  closeOnSelect: computed(() => props.closeOnSelect),
  disabled: computed(() => props.disabled),
  invalid: computed(() => props.invalid),
  calendarProps: computed(() => props.calendarProps),
  setDate,
  setOpen,
})
</script>

<template>
  <PopoverRoot
    v-model:open="openValue"
    data-scope="date-picker"
    data-part="root"
    :class="cn(props.class)"
    :align="props.align"
    :align-offset="props.alignOffset"
    :side="props.side"
    :side-offset="props.sideOffset"
  >
    <slot />
  </PopoverRoot>
</template>
