<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'
</script>

<template>
  <NumberInput.Root
    id="balance"
    default-value="1500"
    :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }"
  >
    <Label for="balance">Balance</Label>
    <NumberInput.Control>
      <NumberInput.Decrement />
      <NumberInput.Input />
      <NumberInput.Increment />
    </NumberInput.Control>
  </NumberInput.Root>
</template>
