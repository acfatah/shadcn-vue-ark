<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import type { DatePickerRootEmits, DatePickerRootProps } from './types.ts'

import { computed, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

import PopoverRoot from '../popover/PopoverRoot.vue'
import { DatePickerProvider } from './context.ts'

const props = withDefaults(defineProps<DatePickerRootProps>(), {
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

const emit = defineEmits<DatePickerRootEmits>()

const dateValue = ref(props.defaultValue) as Ref<DateValue | undefined>

if (props.modelValue)
  dateValue.value = props.modelValue

const openValue = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    dateValue.value = val
  },
  { immediate: true },
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
  dateValue: dateValue as Ref<DateValue | undefined>,
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
