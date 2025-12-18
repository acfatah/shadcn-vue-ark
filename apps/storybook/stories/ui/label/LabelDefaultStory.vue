<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div className="flex items-center space-x-2">
    <Input.Checkbox id="terms" />
    <Label html-for="terms">Accept terms and conditions</Label>
  </div>
</template>
