<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps({
  hideIcon: Boolean,
  icon: String,
})
</script>

<template>
  <Input.Search placeholder="Search..." v-bind="props" />
</template>
