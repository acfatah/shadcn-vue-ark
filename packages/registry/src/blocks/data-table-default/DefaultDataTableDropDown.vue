<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

import type { Payment } from './data/payments'

const props = defineProps<{
  payment: Payment
}>()

function copy(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger as-child>
      <Button variant="ghost" class="size-8 self-end p-0">
        <span class="sr-only">Open menu</span>
        <Ellipsis class="size-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Group>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item value="copy-payment" @click="copy(props.payment.id)">
          Copy payment ID
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item value="view-customer">
          View customer
        </DropdownMenu.Item>
        <DropdownMenu.Item value="view-payment">
          View payment details
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</template>
