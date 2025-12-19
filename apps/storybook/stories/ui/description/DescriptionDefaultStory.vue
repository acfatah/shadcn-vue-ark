<script setup lang="ts">
import { Description } from '@/components/ui/description'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Input.Group>
    <!-- or use "Input.Label" -->
    <Label>Card number</Label>
    <Input.Text placeholder="1234 5678 9012 3456" />
    <!-- or use "Input.Description" component -->
    <Description>Enter your 16-digit number.</Description>
  </Input.Group>
</template>
