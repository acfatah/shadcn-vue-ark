<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <div className="flex items-center space-x-2">
    <Input.Checkbox id="terms" v-bind="props" />
    <Label html-for="terms">Accept terms and conditions</Label>
  </div>
</template>
