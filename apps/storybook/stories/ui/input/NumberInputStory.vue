<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  hideSpinner: Boolean,
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
      Submit the form to exercise the browser's native number validation.
      Valid numbers are between 0 and 100.
    </p>

    <Input.Number required placeholder="000" min="0" max="100" v-bind="props" />

    <Input.Button type="submit" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>
</template>
