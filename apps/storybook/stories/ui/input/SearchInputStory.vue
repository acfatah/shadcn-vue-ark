<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps({
  icon: String,
  noIcon: Boolean,
})
</script>

<template>
  <Input.Search placeholder="Search..." v-bind="props" />
</template>
