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
      Submit the form to exercise the browser's native email validation.
    </p>

    <Input.Email required placeholder="user@example.com" v-bind="props" />

    <Input.Button type="submit" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>
</template>
