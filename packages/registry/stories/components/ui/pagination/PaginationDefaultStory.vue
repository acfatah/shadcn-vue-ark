<script setup lang="ts">
import { ref } from 'vue'

import { Pagination } from '@/components/ui/pagination'

type PaginationItem
  = | { type: 'page', value: number, label: string }
    | { type: 'ellipsis', index: number }

const items: PaginationItem[] = [
  { type: 'page', value: 1, label: '1' },
  { type: 'page', value: 2, label: '2' },
  { type: 'page', value: 3, label: '3' },
  { type: 'ellipsis', index: 3 },
  { type: 'page', value: 10, label: '10' },
]

const page = ref(2)

function getItemKey(item: PaginationItem) {
  if (item.type === 'page')
    return `${item.type}-${item.value}`

  return `${item.type}-${item.index}`
}

function handlePageChange(details: { page: number }) {
  page.value = details.page
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Pagination.Root
      :count="30"
      :page-size="10"
      :page="page"
      @page-change="handlePageChange"
    >
      <Pagination.Content>
        <Pagination.Previous />
        <template v-for="item in items" :key="getItemKey(item)">
          <Pagination.Item
            v-if="item.type === 'page'"
            type="page"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.label }}
          </Pagination.Item>
          <Pagination.Ellipsis
            v-else-if="item.type === 'ellipsis'"
            :index="item.index"
          />
        </template>
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
  </div>
</template>
