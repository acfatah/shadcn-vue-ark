<script setup lang="ts">
import type { Payment } from './payments'

import { DataTable } from '@/components/ui/data-table'

import { columns } from './payments'

defineOptions({ inheritAttrs: false })

const empty: Payment[] = []
</script>

<template>
  <DataTable :columns="columns" :data="empty" />
</template>
