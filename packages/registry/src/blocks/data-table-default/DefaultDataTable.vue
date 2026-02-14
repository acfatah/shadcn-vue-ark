<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { DataTable } from '@/components/ui/data-table'

import columns from './payment-columns'

const data = ref<Record<string, any>[]>([])
const isLoading = ref(false)

async function fetchData() {
  isLoading.value = true

  const payments = await import('./data/payments.ts').then(m => m.data)
  await new Promise(resolve => setTimeout(resolve, 1000))

  isLoading.value = false

  return payments
}

onMounted(async () => {
  data.value = await fetchData()
})
</script>

<template>
  <DataTable :columns="columns" :data="data" :loading="isLoading" />
</template>
