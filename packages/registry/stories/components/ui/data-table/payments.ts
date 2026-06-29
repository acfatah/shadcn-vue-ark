import type { ColumnDef } from '@tanstack/vue-table'

import { ArrowUpDownIcon } from 'lucide-vue-next'
import { h } from 'vue'

import { Button } from '@/components/ui/button'

export interface Payment {
  id: string
  email: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  amount: number
}

// 12 rows so the default 10-per-page pagination yields a second page.
export const payments: Payment[] = [
  { id: 'm5gr84i9', email: 'alice@example.com', status: 'success', amount: 316 },
  { id: '3u1reuv4', email: 'bob@example.com', status: 'success', amount: 242 },
  { id: 'derv1ws0', email: 'carol@example.com', status: 'processing', amount: 837 },
  { id: '5kma53ae', email: 'dave@example.com', status: 'success', amount: 874 },
  { id: 'bhqecj4p', email: 'eve@example.com', status: 'failed', amount: 721 },
  { id: 'p0r9scab', email: 'frank@example.com', status: 'pending', amount: 105 },
  { id: 'qe3f1zol', email: 'grace@example.com', status: 'processing', amount: 459 },
  { id: 'a1b2c3d4', email: 'heidi@example.com', status: 'success', amount: 638 },
  { id: 'e5f6g7h8', email: 'ivan@example.com', status: 'failed', amount: 512 },
  { id: 'i9j0k1l2', email: 'judy@example.com', status: 'pending', amount: 287 },
  { id: 'm3n4o5p6', email: 'ken@example.com', status: 'success', amount: 943 },
  { id: 'q7r8s9t0', email: 'laura@example.com', status: 'processing', amount: 168 },
]

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.getValue('status'),
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      h(
        Button,
        {
          'variant': 'ghost',
          'class': '-ml-3',
          'onClick': () => column.toggleSorting(column.getIsSorted() === 'asc'),
          'aria-label': 'Sort by email',
        },
        () => ['Email', h(ArrowUpDownIcon, { 'class': 'ml-2 size-4', 'aria-hidden': 'true' })],
      ),
    cell: ({ row }) => row.getValue('email'),
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) =>
      h('div', { class: 'text-right font-medium' }, currency.format(row.getValue('amount'))),
  },
]
