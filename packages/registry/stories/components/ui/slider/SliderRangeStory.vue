<script setup lang="ts">
import { Slider } from '@/components/ui/slider'
</script>

<template>
  <Slider
    :default-value="[25, 75]"
    :max="100"
    :step="1"
    class="w-[60%]"
  />
</template>
