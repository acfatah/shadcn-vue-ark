<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <Input.Button v-bind="props">
      Button
    </Input.Button>

    <Input.Submit v-bind="props">
      Submit
    </Input.Submit>

    <Input.Reset v-bind="props">
      Reset
    </Input.Reset>
  </div>
</template>
