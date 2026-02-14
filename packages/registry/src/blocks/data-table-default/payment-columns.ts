import type { Component } from 'vue'

import { createColumnHelper } from '@tanstack/vue-table'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { h } from 'vue'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import type { Payment } from './data/payments'

import DropdownAction from './DefaultDataTableDropDown.vue'

const columnHelper = createColumnHelper<Payment>()
const CheckboxRoot = Checkbox.Root as Component
const CheckboxHiddenInput = Checkbox.HiddenInput as Component
const CheckboxControl = Checkbox.Control as Component
const CheckboxIndicator = Checkbox.Indicator as Component

function renderSelectionCheckbox(options: {
  checked: boolean | 'indeterminate'
  onUpdate: (value: boolean | 'indeterminate') => void
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

export const columns = [
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
    })),
  }),
]

export default columns
