<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'

import { RangeCalendar } from '@/components/ui/range-calendar'

const start = today(getLocalTimeZone())
const end = start.add({ days: 30 })

const dateRange = ref<DateValue[]>([start, end])
</script>

<template>
  <RangeCalendar.Root
    v-model="dateRange"
    class="rounded-md border shadow-sm"
    :num-of-months="2"
  />
</template>
