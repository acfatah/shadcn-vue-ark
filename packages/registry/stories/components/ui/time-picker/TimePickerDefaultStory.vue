<script setup lang="ts">
import { ref } from 'vue'

import type { HourCycle } from '@/components/ui/time-picker'

import { TimePicker } from '@/components/ui/time-picker'

interface Props {
  defaultValue?: string
  hourCycle?: HourCycle
  step?: number
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  hourCycle: 12,
})

const value = ref(props.defaultValue ?? '')
</script>

<template>
  <TimePicker.Root
    v-model="value"
    :hour-cycle="hourCycle"
    :step="step"
    :disabled="disabled"
    :invalid="invalid"
    :placeholder="placeholder"
    :align="align"
    :align-offset="alignOffset"
    :side="side"
    :side-offset="sideOffset"
  >
    <TimePicker.Trigger />
    <TimePicker.Content />
  </TimePicker.Root>
</template>
