<script setup lang="ts">
import { computed, ref } from 'vue'

import { Field } from '@/components/ui/field'
import { Pagination } from '@/components/ui/pagination'
import { createListCollection, Select } from '@/components/ui/select'

interface RowsPerPageItem {
  label: string
  value: string
}

const rowsPerPageOptions: RowsPerPageItem[] = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]

const rowsPerPageCollection = createListCollection<RowsPerPageItem>({
  items: rowsPerPageOptions,
})

const rowsPerPage = ref<string[]>(['25'])
const pageSize = computed(() => Number(rowsPerPage.value[0] ?? '25'))
const page = ref(2)

function handlePageChange(details: { page: number }) {
  page.value = details.page
}
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <Field.Root orientation="horizontal" class="w-fit">
      <Field.Label for="select-rows-per-page" class="whitespace-nowrap">
        Rows per page
      </Field.Label>
      <Select.Root v-model="rowsPerPage" :collection="rowsPerPageCollection">
        <Select.Trigger id="select-rows-per-page" class="w-20">
          <Select.ValueText />
        </Select.Trigger>
        <Select.Content>
          <Select.ItemGroup>
            <Select.Item
              v-for="item in rowsPerPageCollection.items"
              :key="item.value"
              :item="item"
            >
              <Select.ItemText>{{ item.label }}</Select.ItemText>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Root>
    </Field.Root>

    <Pagination.Root
      class="mx-0 w-auto"
      :count="30"
      :page-size="pageSize"
      :page="page"
      @page-change="handlePageChange"
    >
      <Pagination.Content>
        <Pagination.Previous />
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
  </div>
</template>
