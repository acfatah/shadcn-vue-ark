<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
</script>

<template>
  <Checkbox.Group v-bind="$attrs">
    <slot />
  </Checkbox.Group>
</template>
