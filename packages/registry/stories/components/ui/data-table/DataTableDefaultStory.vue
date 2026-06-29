<script setup lang="ts">
import { DataTable } from '@/components/ui/data-table'

import { columns, payments } from './payments'

defineOptions({ inheritAttrs: false })
defineProps<{
  pagination?: boolean
  loading?: boolean
  hideFilter?: boolean
  hidePagination?: boolean
}>()
</script>

<template>
  <DataTable
    :columns="columns"
    :data="payments"
    :pagination="pagination"
    :loading="loading"
    :hide-filter="hideFilter"
    :hide-pagination="hidePagination"
  />
</template>
