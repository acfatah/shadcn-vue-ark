<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Input } from '@/components/ui/input'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  loading: Boolean,
})

const options = [
  // Need to use an empty value for the placeholder option
  // { value: '', label: 'Select status' },

  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'archived', label: 'Archived' },
]

const formRef = useTemplateRef<HTMLFormElement>('formRef')
const modelValue = ref<string | undefined>(undefined)
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
  <form ref="formRef" class="space-y-3" @submit="handleSubmit">
    <p class="text-sm text-muted-foreground">
      Submit the form to exercise the browser's native select validation.
    </p>

    <Input.Select
      v-bind="props"
      v-model="modelValue"
      required
      name="select-input"
    >
      <!--
        Use data-part="placeholder", value="" and disabled attributes for the
        placeholder option
      -->
      <option data-part="placeholder" value="" disabled>
        Select status
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.value === ''"
      >
        {{ option.label }}
      </option>
    </Input.Select>

    <Input.Button type="submit" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>

  <p class="mt-4 text-sm text-muted-foreground">
    modelValue: <code>{{ modelValue }}</code>
  </p>

  <template v-if="submittedValues !== null">
    <p class="mt-4 text-sm text-muted-foreground">
      Submitted values:
    </p>

    <pre
      class="
        overflow-x-auto rounded border bg-neutral-100 p-2 text-sm text-foreground
        dark:bg-neutral-900
      "
    ><code>{{ submittedValues ? JSON.stringify(submittedValues, null, 2) : '-' }}</code></pre>
  </template>
</template>
