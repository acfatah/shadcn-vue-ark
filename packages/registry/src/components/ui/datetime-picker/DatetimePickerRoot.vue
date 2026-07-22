<script setup lang="ts">
import type { CalendarDateTime } from '@internationalized/date'
import type { Ref } from 'vue'
import type { DatetimePickerRootEmits, DatetimePickerRootProps } from './types'

import { computed, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

import PopoverRoot from '../popover/PopoverRoot.vue'
import { DatetimePickerProvider } from './context'

const props = withDefaults(defineProps<DatetimePickerRootProps>(), {
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

const emit = defineEmits<DatetimePickerRootEmits>()

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
