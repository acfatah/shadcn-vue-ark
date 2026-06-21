<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { cn } from '@/lib/utils'

import type { TimePickerRootEmits, TimePickerRootProps } from './types'

import PopoverRoot from '../popover/PopoverRoot.vue'
import { TimePickerProvider } from './context'
import {
  clampHour,
  clampHour12,
  clampMinute,
  pad,
  parseTime,
  periodOf,
  to12,
  to24,
} from './utils'

const props = withDefaults(defineProps<TimePickerRootProps>(), {
  modelValue: undefined,
  defaultValue: '',
  placeholder: undefined,
  hourCycle: 12,
  disabled: false,
  invalid: false,
  step: 5,
  align: 'start',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 2,
})

const emit = defineEmits<TimePickerRootEmits>()

const timeValue = ref<string>(props.modelValue ?? props.defaultValue ?? '')
const openValue = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined)
      timeValue.value = val
  },
)

const placeholder = computed(
  () => props.placeholder
    ?? (props.hourCycle === 24 ? 'HH:MM' : 'hh:mm AM/PM'),
)

function setTime(val: string) {
  timeValue.value = val
  emit('update:modelValue', val)
}

// In 12-hour mode `h` is a 1-12 value combined with the current period; in
// 24-hour mode `h` is already a 0-23 value.
function setHour(h: number) {
  const { hour, minute } = parseTime(timeValue.value)

  if (props.hourCycle === 24) {
    setTime(`${pad(clampHour(h))}:${pad(minute)}`)

    return
  }

  setTime(`${pad(to24(clampHour12(h), periodOf(hour)))}:${pad(minute)}`)
}

function setMinute(m: number) {
  const { hour } = parseTime(timeValue.value)
  setTime(`${pad(hour)}:${pad(clampMinute(m))}`)
}

// AM/PM only exists in 12-hour mode; ignore the call in 24-hour mode.
function setPeriod(period: 'AM' | 'PM') {
  if (props.hourCycle === 24)
    return

  const { hour, minute } = parseTime(timeValue.value)
  setTime(`${pad(to24(to12(hour), period))}:${pad(minute)}`)
}

function setOpen(val: boolean) {
  openValue.value = val
}

TimePickerProvider({
  timeValue,
  placeholder,
  hourCycle: computed(() => props.hourCycle),
  disabled: computed(() => props.disabled),
  invalid: computed(() => props.invalid),
  step: computed(() => props.step),
  setTime,
  setHour,
  setMinute,
  setPeriod,
  setOpen,
})
</script>

<template>
  <PopoverRoot
    v-model:open="openValue"
    data-scope="time-picker"
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
