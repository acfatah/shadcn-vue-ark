<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input } from '@/components/ui/input'

const disabled = computed(() => {
  const attrs = useAttrs()

  return attrs.disabled as boolean | undefined
})

const state = computed(() => {
  const attrs = useAttrs()

  return attrs.state as boolean | null
})

const indeterminate = computed(() => {
  const attrs = useAttrs()

  return attrs.indeterminate as boolean | undefined
})
</script>

<template>
  <div class="group flex items-center gap-2">
    <Input.Checkbox
      id="single"
      :model-value="state"
      :disabled="disabled"
      :indeterminate="indeterminate"
    />
    <Input.Label for="single">
      Subscribe to newsletter
    </Input.Label>
  </div>
</template>
