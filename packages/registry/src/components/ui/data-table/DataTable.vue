<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/vue-table'

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { useWindowSize } from '@vueuse/core'
import { ChevronsUpDownIcon, Columns3Icon } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Table } from '@/components/ui/table'

import { valueUpdater } from './utils'

const props = withDefaults(defineProps<{
  columns: ColumnDef<any, any>[]
  data: Record<string, any>[]
  pagination?: boolean
  loading?: boolean
  hideFilter?: boolean
  hidePagination?: boolean
}>(), {
  pagination: true,
  loading: false,
  hideFilter: false,
  hidePagination: false,
})

// Table state
// https://tanstack.com/table/latest/docs/api/core/table#state
const sorting = ref<ColumnSort[]>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'includesString',
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),

  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})

const { width: screenWidth } = useWindowSize()
</script>

<template>
  <div>
    <slot v-if="!props.hideFilter" name="filter" :table="table">
      <div class="flex w-full items-center gap-x-2 py-4">
        <Input.Search
          class="
            w-min max-w-sm
            sm:w-sm
          " placeholder="Quick search..."
          @update:model-value="table.setGlobalFilter(String($event))"
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger as-child>
            <Button
              variant="outline"
              class="ml-auto"
              :size="screenWidth < 640 ? 'icon' : 'md'"
            >
              <span
                class="
                  hidden
                  sm:inline
                "
              >Columns</span>
              <Columns3Icon v-if="screenWidth < 640" class="size-4" aria-hidden="true" />
              <ChevronsUpDownIcon v-else class="ml-2 size-4" aria-hidden="true" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.CheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :checked="column.getIsVisible()"
              :value="column.id"
              @update:checked="(value) => {
                column.toggleVisibility(!!value)
              }"
            >
              {{ column.id }}
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </slot>
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <Table.Head v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <template v-if="props.loading">
            <Table.Cell :colspan="columns.length" class="h-24 text-center">
              <Spinner class="m-auto size-5" />
            </Table.Cell>
          </template>
          <template v-else-if="table.getRowModel().rows?.length">
            <Table.Row
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <Table.Cell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </Table.Cell>
            </Table.Row>
          </template>
          <template v-else>
            <Table.Row>
              <Table.Cell :colspan="columns.length" class="h-24 text-center">
                No results
              </Table.Cell>
            </Table.Row>
          </template>
        </Table.Body>
      </Table.Root>
    </div>
    <slot v-if="!props.hidePagination" name="pagination" :table="table">
      <div v-if="pagination" class="flex items-center justify-end space-x-2 py-4">
        <div
          class="
            hidden flex-1 text-sm text-muted-foreground
            sm:block
          "
        >
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </slot>
  </div>
</template>
