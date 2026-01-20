<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  loading: Boolean,
  hideIcon: Boolean,
})

const formRef = useTemplateRef<HTMLFormElement>('formRef')

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
      Submit the form to exercise the browser's native datetime-local validation.
    </p>

    <Input.Datetime required v-bind="props" name="datetime-input" />

    <Input.Button type="submit" :disabled="props.disabled">
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
