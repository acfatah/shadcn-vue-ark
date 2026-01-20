<script setup lang="ts">
import { ref } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps<{
  indeterminate?: boolean
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  inline?: boolean

  state?: boolean | null
}>()

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
  <form ref="formRef" class="space-y-3" @submit="handleSubmit">
    <p class="text-sm text-muted-foreground">
      Submit the form to exercise the browser's native checkbox validation.
    </p>

    <Input.Group :inline="props.inline">
      <Input.Checkbox
        name="subscribe"
        :model-value="props.state"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :invalid="props.invalid"
      />
      <Input.Label for="subscribe">
        Subscribe to newsletter
      </Input.Label>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Checkbox
        name="notifications"
        :model-value="props.state"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :invalid="props.invalid"
      />
      <Input.Label for="notifications">
        Enable notifications
      </Input.Label>
    </Input.Group>

    <Input.Button type="submit" class="block" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>

  <template v-if="submittedValues !== null">
    <p class="mt-4 text-sm text-muted-foreground">
      Submitted values:
    </p>

    <pre
      class="
        overflow-x-auto rounded-sm border bg-neutral-100 p-2 text-sm text-foreground
        dark:bg-neutral-900
      "
    ><code>{{ submittedValues ? JSON.stringify(submittedValues, null, 2) : '-' }}</code></pre>
  </template>
</template>
