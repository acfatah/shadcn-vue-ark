<script setup lang="ts">
import type { Component } from 'vue'

import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { h, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { valueUpdater } from '@/components/ui/data-table'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'

import type { Payment } from './data/payments'

import { data } from './data/payments'
import DropdownAction from './TanStackTableDropdown.vue'

const columnHelper = createColumnHelper<Payment>()

const CheckboxRoot = Checkbox.Root as Component
const CheckboxHiddenInput = Checkbox.HiddenInput as Component
const CheckboxControl = Checkbox.Control as Component
const CheckboxIndicator = Checkbox.Indicator as Component

function renderSelectionCheckbox(options: {
  checked: boolean | 'indeterminate'
  onUpdate: (value: boolean) => void
  ariaLabel: string
}) {
  return h(CheckboxRoot, {
    'checked': options.checked,
    'onUpdate:checked': options.onUpdate,
    'aria-label': options.ariaLabel,
    'class': 'items-center justify-center gap-0',
  }, () => [
    h(CheckboxHiddenInput),
    h(CheckboxControl, null, () => h(CheckboxIndicator)),
  ])
}

const columns = [
  columnHelper.group({
    id: 'select',
    header: ({ table }) => renderSelectionCheckbox({
      checked: table.getIsAllPageRowsSelected()
        || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      onUpdate: value => table.toggleAllPageRowsSelected(!!value),
      ariaLabel: 'Select all',
    }),
    cell: ({ row }) => renderSelectionCheckbox({
      checked: row.getIsSelected(),
      onUpdate: value => row.toggleSelected(!!value),
      ariaLabel: 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
  }),

  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ChevronsUpDownIcon, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  }),

  columnHelper.accessor('amount', {
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    footer: props => props.column.getFacetedUniqueValues().size,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),

  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, h(DropdownAction, {
      payment: row.original,
      onExpand: row.toggleExpanded,
    })),
  }),
]

const sorting = ref([])
const columnFilters = ref([])
const columnVisibility = ref({})
const rowSelection = ref({})
const expanded = ref({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center py-4">
      <Input.Text
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="(table.getColumn('email')?.getFilterValue() as string)"
        @update:model-value=" table.getColumn('email')?.setFilterValue($event)"
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronsUpDownIcon class="ml-2 size-4" />
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
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <Table.Head v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <Table.Row :data-state="row.getIsSelected() ? 'selected' : undefined">
                <Table.Cell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </Table.Cell>
              </Table.Row>
              <Table.Row v-if="row.getIsExpanded()">
                <Table.Cell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </Table.Cell>
              </Table.Row>
            </template>
          </template>

          <Table.Row v-else>
            <Table.Cell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
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
    </div>
  </div>
</template>
