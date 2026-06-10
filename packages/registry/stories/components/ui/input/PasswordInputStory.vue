<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps({
  hideIcon: Boolean,
  showPasswordIcon: String,
  hidePasswordIcon: String,
})
</script>

<template>
  <Input.Password placeholder="******" v-bind="props" />
</template>
