<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input } from '@/components/ui/input'

const disabled = computed(() => useAttrs().disabled as boolean | undefined)
const checked = computed(() => useAttrs().modelValue as boolean | undefined)
const indeterminate = computed(() => useAttrs().indeterminate as boolean | undefined)
const invalid = computed(() => useAttrs().invalid as boolean | undefined)
</script>

<template>
  <div class="group flex items-center gap-2">
    <Input.Checkbox
      id="subscribe"
      :model-value="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :invalid="invalid"
    />
    <Input.Label for="subscribe">
      Subscribe to newsletter
    </Input.Label>
  </div>
</template>
