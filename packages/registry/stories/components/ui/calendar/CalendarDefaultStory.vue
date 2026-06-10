<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { CalendarDate, fromDate, getLocalTimeZone } from '@internationalized/date'
import { ref } from 'vue'

import { Calendar } from '@/components/ui/calendar'

const date = ref<DateValue[]>([fromDate(new Date(), getLocalTimeZone())])
</script>

<template>
  <Calendar.Root
    v-model="date"
    class="rounded-md border shadow-sm"
    :min-value="new CalendarDate(1925, 1, 1)"
    :max-value="new CalendarDate(2035, 1, 1)"
  />
</template>
