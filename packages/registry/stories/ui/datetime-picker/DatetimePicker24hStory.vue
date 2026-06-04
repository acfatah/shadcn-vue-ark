<script setup lang="ts">
import type { CalendarDateTime } from '@internationalized/date'

import { ref } from 'vue'

import { DatetimePicker } from '@/components/ui/datetime-picker'

const datetime = ref<CalendarDateTime>()
</script>

<template>
  <DatetimePicker.Root v-model="datetime" :hour-cycle="24">
    <DatetimePicker.Trigger />
    <DatetimePicker.Content />
  </DatetimePicker.Root>
</template>
