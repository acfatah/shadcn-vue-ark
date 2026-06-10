<script setup lang="ts">
import { Description } from '@/components/ui/description'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Field.Root>
    <!-- or use "Field.Label" -->
    <Label>Card number</Label>
    <Input.Text placeholder="1234 5678 9012 3456" />
    <!-- or use "Field.Description" component -->
    <Description>Enter your 16-digit number.</Description>
  </Field.Root>
</template>
