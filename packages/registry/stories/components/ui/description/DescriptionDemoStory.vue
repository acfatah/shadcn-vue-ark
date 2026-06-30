<script setup lang="ts">
import { Description } from '@/components/ui/description'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="grid w-full max-w-sm gap-1.5">
    <Label for="card">Card number</Label>
    <Input.Text id="card" placeholder="1234 5678 9012 3456" />
    <Description>Enter your 16-digit card number.</Description>
  </div>
</template>
