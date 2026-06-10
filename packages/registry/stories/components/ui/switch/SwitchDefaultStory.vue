<script setup lang="ts">
import { Switch } from '@/components/ui/switch'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  loading: Boolean,
})
</script>

<template>
  <Switch.Root v-bind="props">
    <Switch.HiddenInput />
    <Switch.Control />
    <Switch.Label>Airplane Mode</Switch.Label>
  </Switch.Root>
</template>
