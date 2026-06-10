<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'
</script>

<template>
  <NumberInput.Root
    id="number"
    default-value="5"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  >
    <Label for="number">Number</Label>
    <NumberInput.Control>
      <NumberInput.Decrement />
      <NumberInput.Input />
      <NumberInput.Increment />
    </NumberInput.Control>
  </NumberInput.Root>
</template>
