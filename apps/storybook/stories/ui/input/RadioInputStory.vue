<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  name?: string
  value?: string
  inline?: boolean
}>()

const radioOptions = [
  { label: 'Default', value: 'default', required: true },
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Compact', value: 'compact' },
]

const selectedOption = ref<string | number | null>(radioOptions[0]?.value ?? null)
const formRef = ref<HTMLFormElement | null>(null)
const submittedValues = ref<Record<string, FormDataEntryValue> | null>(null)

function handleSubmit(event: Event) {
  event.preventDefault()

  const form = formRef.value

  if (!form || !form.reportValidity()) {
    return
  }

  submittedValues.value = Object.fromEntries(new FormData(form).entries())
}
</script>

<template>
  <form
    ref="formRef" class="space-y-3" @submit="handleSubmit"
  >
    <p class="text-sm text-muted-foreground">
      Submit the form to exercise the browser's native radio validation.
    </p>

    <Input.Group
      v-for="option in radioOptions"
      :key="option.value"
      :inline="props.inline ?? undefined"
      :invalid="props.invalid"
    >
      <Input.Radio
        v-model="selectedOption"
        name="radio-input"
        :value="option.value"
        :disabled="props.disabled"
        :invalid="props.invalid"
        :loading="props.loading"
        :required="option.required"
      />
      <Input.Label>
        {{ option.label }}
      </Input.Label>
    </Input.Group>

    <p class="text-sm text-muted-foreground">
      Current selection: {{ selectedOption ?? 'None' }}
    </p>

    <Input.Button type="submit" class="block" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>

  <template v-if="submittedValues !== null">
    <p class="mt-4 text-sm text-muted-foreground">
      Submitted values:
    </p>

    <pre
      class="overflow-x-auto rounded border bg-gray-100 p-2 text-sm"
    ><code>{{ submittedValues ? JSON.stringify(submittedValues, null, 2) : '-' }}</code></pre>
  </template>
</template>
