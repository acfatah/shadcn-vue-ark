<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'
</script>

<template>
  <NumberInput.Root
    id="age"
    default-value="18"
    :min="0"
  >
    <Label for="age">Age</Label>
    <NumberInput.Control>
      <NumberInput.Decrement />
      <NumberInput.Input />
      <NumberInput.Increment />
    </NumberInput.Control>
  </NumberInput.Root>
</template>
