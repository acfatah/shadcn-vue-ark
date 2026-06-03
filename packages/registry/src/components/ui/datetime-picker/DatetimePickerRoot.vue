<script setup lang="ts">
import type { CalendarDateTime } from '@internationalized/date'
import type { HTMLAttributes, Ref } from 'vue'

import { computed, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

import type { HourCycle, LayoutTypes } from './types'

import PopoverRoot from '../popover/PopoverRoot.vue'
import { DatetimePickerProvider } from './context'

interface Props {
  class?: HTMLAttributes['class']
  modelValue?: CalendarDateTime
  defaultValue?: CalendarDateTime
  layout?: LayoutTypes
  placeholder?: string
  formatOptions?: Intl.DateTimeFormatOptions
  locale?: string
  hourCycle?: HourCycle
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
  placeholder: 'Pick date and time',
  formatOptions: () => ({
    dateStyle: 'long',
    timeStyle: 'short',
  }),
  locale: 'en-US',
  hourCycle: 12,
  disabled: false,
  invalid: false,
  calendarProps: () => ({}),
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 2,
})

const emit = defineEmits<{
  'update:modelValue': [value: CalendarDateTime | undefined]
}>()

const datetimeValue = ref(
  props.defaultValue,
) as Ref<CalendarDateTime | undefined>

if (props.modelValue)
  datetimeValue.value = props.modelValue

const openValue = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    datetimeValue.value = val
  },
)

function setDatetime(val: CalendarDateTime | undefined) {
  datetimeValue.value = val
  emit('update:modelValue', val)
}

function setOpen(val: boolean) {
  openValue.value = val
}

DatetimePickerProvider({
  datetimeValue: datetimeValue as Ref<
    CalendarDateTime | undefined
  >,
  layout: computed(() => props.layout),
  placeholder: computed(() => props.placeholder),
  formatOptions: computed(() => props.formatOptions),
  locale: computed(() => props.locale),
  hourCycle: computed(() => props.hourCycle),
  disabled: computed(() => props.disabled),
  invalid: computed(() => props.invalid),
  calendarProps: computed(() => props.calendarProps),
  setDatetime,
  setOpen,
})
</script>

<template>
  <PopoverRoot
    v-model:open="openValue"
    data-scope="datetime-picker"
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
