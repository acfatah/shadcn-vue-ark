<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  indeterminate?: boolean
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
}>()

const state = computed(() => useAttrs().state as boolean | null)
</script>

<template>
  <div class="group flex items-center gap-2">
    <Input.Checkbox
      id="subscribe"
      :model-value="state"
      :indeterminate="props.indeterminate"
      :disabled="props.disabled"
      :invalid="props.invalid"
    />
    <Input.Label for="subscribe">
      Subscribe to newsletter
    </Input.Label>
  </div>
</template>
