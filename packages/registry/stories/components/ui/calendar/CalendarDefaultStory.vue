<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { CalendarDate } from '@internationalized/date'
import { ref } from 'vue'

import { Calendar } from '@/components/ui/calendar'

// Pinned date (no Date.now()) keeps the rendered month deterministic for tests.
const date = ref<DateValue[]>([new CalendarDate(2026, 6, 15)])
</script>

<template>
  <Calendar.Root
    v-model="(date as DateValue[])"
    class="rounded-md border shadow-sm"
    :min-value="new CalendarDate(1925, 1, 1)"
    :max-value="new CalendarDate(2035, 1, 1)"
  />
</template>
