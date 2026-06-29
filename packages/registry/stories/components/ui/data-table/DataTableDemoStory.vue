<script setup lang="ts">
import { DataTable } from '@/components/ui/data-table'

import { columns, payments } from './payments'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="w-full">
    <h3 class="mb-2 text-lg font-semibold tracking-tight">
      Payments
    </h3>
    <p class="mb-4 text-sm text-muted-foreground">
      Search, sort, hide columns, and paginate a list of recent payments.
    </p>
    <DataTable :columns="columns" :data="payments" />
  </div>
</template>
