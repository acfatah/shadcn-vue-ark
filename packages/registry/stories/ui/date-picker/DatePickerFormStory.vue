<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Field } from '@/components/ui/field'

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
  <form ref="formRef" class="space-y-4" @submit="handleSubmit">
    <Field.Root>
      <Field.Label for="delivery-date-4mz">
        Delivery date
      </Field.Label>
      <Field.Description>
        The input carries the submitted ISO value while the trigger keeps the existing calendar UI.
      </Field.Description>

      <DatePicker.Root>
        <div
          class="
            flex flex-col gap-3
            sm:flex-row sm:items-start
          "
        >
          <DatePicker.Input
            id="delivery-date-4mz"
            name="deliveryDate"
            required
            class="sm:max-w-48"
          />
          <DatePicker.Trigger class="sm:w-56" />
        </div>
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>

    <Button type="submit">
      Submit
    </Button>
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
