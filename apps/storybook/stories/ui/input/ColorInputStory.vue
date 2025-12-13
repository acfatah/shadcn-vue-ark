<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
}>()
</script>

<template>
  <Input.Color v-bind="props" />
</template>
