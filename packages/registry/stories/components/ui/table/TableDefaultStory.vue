<script setup lang="ts">
import { Table } from '@/components/ui/table'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
</script>

<template>
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-25">
          Invoice
        </Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head class="text-right">
          Amount
        </Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row v-for="invoice in invoices" :key="invoice.invoice">
        <Table.Cell class="font-medium">
          {{ invoice.invoice }}
        </Table.Cell>
        <Table.Cell>{{ invoice.paymentStatus }}</Table.Cell>
        <Table.Cell>{{ invoice.paymentMethod }}</Table.Cell>
        <Table.Cell class="text-right">
          {{ invoice.totalAmount }}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colspan="3">
          Total
        </Table.Cell>
        <Table.Cell class="text-right">
          $2,500.00
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table.Root>
</template>
