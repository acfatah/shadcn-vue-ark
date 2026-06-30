<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { CalendarDate } from '@internationalized/date'
import { ref } from 'vue'

import { RangeCalendar } from '@/components/ui/range-calendar'

// Pinned range (no Date.now()) keeps the rendered months deterministic.
const start = new CalendarDate(2026, 6, 10)
const end = new CalendarDate(2026, 6, 20)

const dateRange = ref<DateValue[]>([start, end])
</script>

<template>
  <RangeCalendar.Root
    v-model="(dateRange as DateValue[])"
    class="rounded-md border shadow-sm"
    :num-of-months="2"
  />
</template>
