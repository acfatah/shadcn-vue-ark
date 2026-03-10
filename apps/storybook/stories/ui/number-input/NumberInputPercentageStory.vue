<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'
</script>

<template>
  <NumberInput.Root
    id="percent"
    default-value="0.05"
    :step="0.01"
    :format-options="{
      style: 'percent',
    }"
  >
    <Label for="percent">Percent</Label>
    <NumberInput.Control>
      <NumberInput.Decrement />
      <NumberInput.Input />
      <NumberInput.Increment />
    </NumberInput.Control>
  </NumberInput.Root>
</template>
