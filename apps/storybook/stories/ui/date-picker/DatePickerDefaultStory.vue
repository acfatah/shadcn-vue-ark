<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { ref } from 'vue'

import { DatePicker } from '@/components/ui/date-picker'

const date = ref<DateValue>()
</script>

<template>
  <DatePicker.Root v-model="date">
    <DatePicker.Trigger />
    <DatePicker.Content />
  </DatePicker.Root>
</template>
