<script setup lang="ts">
import { ref } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  loading: Boolean,
  hideIcon: Boolean,
  icon: String,
})

const formRef = ref<HTMLFormElement | null>(null)

function handleSubmit(event: Event) {
  event.preventDefault()

  formRef.value?.reportValidity()
}
</script>

<template>
  <form ref="formRef" class="space-y-3" @submit="handleSubmit">
    <p class="text-sm text-muted-foreground">
      Submit the form to exercise the browser's native tel validation.
    </p>

    <Input.Tel
      required
      pattern="^\+60[1-9]\d-\d{4} \d{3,4}$"
      placeholder="+6012-3456 7890"
      v-bind="props"
    />

    <Input.Description class="text-xs">
      Pattern: <code>^\+60[1-9]\d-\d{4} \d{3,4}$</code>
    </Input.Description>

    <Input.Button type="submit" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>
</template>
