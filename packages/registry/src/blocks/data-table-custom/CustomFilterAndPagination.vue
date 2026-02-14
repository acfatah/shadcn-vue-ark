<script setup lang="ts">
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
} from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { createListCollection, Select } from '@/components/ui/select'

import columns from './payment-columns'

const data = ref<Record<string, any>[]>([])
const isLoading = ref(false)
const pageSizeOptions = [10, 20, 30, 40, 50]

const pageSizeCollection = createListCollection<{ label: string, value: string }>({
  items: pageSizeOptions.map(pageSize => ({
    label: String(pageSize),
    value: String(pageSize),
  })),
})

function getPageSizeModelValue(pageSize: number) {
  return [String(pageSize)]
}

function handlePageSizeUpdate(
  value: string[] | undefined,
  table: {
    getState: () => { pagination: { pageSize: number } }
    setPageSize: (pageSize: number) => void
  },
) {
  const nextPageSize = Number(value?.[0] ?? table.getState().pagination.pageSize)

  if (Number.isNaN(nextPageSize)) {
    return
  }

  table.setPageSize(nextPageSize)
}

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
  <DataTable :columns="columns" :data="data" :loading="isLoading">
    <template #filter="{ table }">
      <div class="flex items-center justify-end py-4">
        <Input.Text
          class="ml-auto max-w-sm" placeholder="Filter emails..."
          :model-value="(table.getColumn('email')?.getFilterValue() as string)"
          @update:model-value=" table.getColumn('email')?.setFilterValue($event)"
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger as-child>
            <Button variant="outline" class="ml-1">
              <SlidersHorizontalIcon class="size-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.CheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :value="column.id"
              :checked="column.getIsVisible()"
              @update:checked="(value) => {
                column.toggleVisibility(!!value)
              }"
            >
              {{ column.id }}
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </template>

    <template #pagination="{ table }">
      <div
        class="
          flex items-center justify-between px-0 py-4
          lg:px-2
        "
      >
        <div
          class="
            hidden w-full flex-1 text-sm whitespace-nowrap text-muted-foreground
            sm:block
          "
        >
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div
          class="
            flex w-full items-center justify-between space-x-6
            sm:justify-end
            lg:space-x-8
          "
        >
          <div class="flex items-center space-x-2">
            <p
              class="
                hidden text-sm font-medium whitespace-nowrap
                sm:flex
              "
            >
              Rows per page
            </p>
            <Select.Root
              :collection="pageSizeCollection"
              :model-value="getPageSizeModelValue(table.getState().pagination.pageSize)"
              @update:model-value="(value) => handlePageSizeUpdate(value, table)"
            >
              <Select.Trigger class="h-8 w-[70px]">
                <Select.ValueText :placeholder="`${table.getState().pagination.pageSize}`" />
              </Select.Trigger>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.Item
                    v-for="pageSize in pageSizeCollection.items"
                    :key="pageSize.value"
                    :item="pageSize"
                  >
                    <Select.ItemText>{{ pageSize.label }}</Select.ItemText>
                  </Select.Item>
                </Select.ItemGroup>
              </Select.Content>
            </Select.Root>
          </div>
          <div class="flex w-min items-center justify-center text-sm font-medium whitespace-nowrap">
            Page <Input.Number
              type="number"
              min="1"
              class="m-1 h-8 w-16 rounded-sm border p-1 text-right"
              :max="table.getPageCount()"
              :default-value="String(table.getState().pagination.pageIndex + 1)"
              :model-value="String(table.getState().pagination.pageIndex + 1)"
              @update:model-value="Number($event) < table.getPageCount()
                ? table.setPageIndex(Number($event) - 1)
                : table.setPageIndex(table.getPageCount() - 1)
              "
            /> of {{ table.getPageCount() }}
          </div>
          <div class="flex items-center gap-x-2">
            <Button
              variant="outline"
              class="
                hidden size-8 p-0
                lg:flex
              "
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            >
              <span class="sr-only">Go to first page</span>
              <ChevronFirstIcon class="size-4" />
            </Button>
            <Button
              variant="outline"
              class="size-8 p-0"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <span class="sr-only">Go to previous page</span>
              <ChevronLeftIcon class="size-4" />
            </Button>
            <Button
              variant="outline"
              class="size-8 p-0"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <span class="sr-only">Go to next page</span>
              <ChevronRightIcon class="size-4" />
            </Button>
            <Button
              variant="outline"
              class="
                hidden size-8 p-0
                lg:flex
              "
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            >
              <span class="sr-only">Go to last page</span>
              <ChevronLastIcon class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </template>
  </DataTable>
</template>
