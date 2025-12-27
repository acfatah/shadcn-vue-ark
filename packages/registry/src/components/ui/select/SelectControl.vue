<script setup lang="ts">
import { Select } from '@ark-ui/vue/select'
</script>

<template>
  <Select.Control v-bind="$attrs">
    <slot />
  </Select.Control>
</template>
