<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps({
  invalid: Boolean,
  disabled: Boolean,
  loading: Boolean,
  hideThumb: Boolean,
  min: Number,
  max: Number,
  step: Number,
})

const formRef = useTemplateRef<HTMLFormElement>('formRef')
const sliderValue = ref<number | undefined>(undefined)

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
      Submit the form to exercise the browser's native range validation.
    </p>

    <Input.Range
      v-bind="props"
      v-model="sliderValue"
      required
      name="range-input"
    />

    <Input.Button type="submit" :disabled="props.disabled">
      Validate
    </Input.Button>
  </form>

  <p class="mt-4 text-sm text-muted-foreground">
    modelValue: <code>{{ sliderValue }}</code>
  </p>

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
