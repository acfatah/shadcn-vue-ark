<script setup lang="ts">
import { Accordion } from '@ark-ui/vue/accordion'
</script>

<template>
  <Accordion.Root v-bind="$attrs">
    <slot />
  </Accordion.Root>
</template>
