<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { ref } from 'vue'

import { DatePicker } from '@/components/ui/date-picker'
import { Field } from '@/components/ui/field'

const date = ref<DateValue>()
</script>

<template>
  <div class="grid max-w-sm gap-6">
    <Field.Root>
      <Field.Label for="default-input">Default</Field.Label>
      <DatePicker.Root v-model="date">
        <DatePicker.Input id="default-input" name="date" />
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>

    <Field.Root>
      <Field.Label for="disabled-input">Disabled</Field.Label>
      <DatePicker.Root>
        <DatePicker.Input id="disabled-input" disabled />
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>

    <Field.Root>
      <Field.Label for="invalid-input">Invalid</Field.Label>
      <DatePicker.Root>
        <DatePicker.Input id="invalid-input" invalid />
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>

    <Field.Root>
      <Field.Label for="constrained-input">With min/max</Field.Label>
      <Field.Description>
        Only dates between 2026-01-01 and 2026-12-31 are accepted.
      </Field.Description>
      <DatePicker.Root>
        <DatePicker.Input
          id="constrained-input"
          min="2026-01-01"
          max="2026-12-31"
        />
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>

    <Field.Root>
      <Field.Label for="required-input">Required</Field.Label>
      <DatePicker.Root>
        <DatePicker.Input id="required-input" required />
        <DatePicker.Content />
      </DatePicker.Root>
    </Field.Root>
  </div>
</template>
