<script setup lang="ts">
import { computed, ref } from 'vue'

import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  indeterminate?: boolean
  disabled?: boolean
  invalid?: boolean
  loading?: boolean

  state?: boolean | null
}>()

const formRef = ref<HTMLFormElement | null>(null)
const submittedValues = ref<Record<string, FormDataEntryValue> | null>(null)

const notificationsValue = ref(false)
const agreementValue = ref(false)
const showErrors = ref(false)
const notificationsInvalid = computed(() => showErrors.value && !notificationsValue.value)
const agreementInvalid = computed(() => showErrors.value && !agreementValue.value)

function handleSubmit(event: Event) {
  event.preventDefault()

  const form = formRef.value

  showErrors.value = true

  if (notificationsInvalid.value || !form || !form.reportValidity()) {
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

    <Fieldset.Group class="gap-3">
      <Field.Root
        :disabled="props.disabled"
        :invalid="props.invalid"
      >
        <Input.Checkbox
          id="subscribe"
          name="subscribe"
          :model-value="props.state"
          :indeterminate="props.indeterminate"
          :disabled="props.disabled"
          :invalid="props.invalid"
        />
        <Field.Label for="subscribe">
          Subscribe to newsletter
        </Field.Label>
      </Field.Root>

      <Field.Root
        :disabled="props.disabled"
        :invalid="props.invalid || notificationsInvalid"
      >
        <Input.Checkbox
          id="notifications"
          v-model="notificationsValue"
          name="notifications"
          :indeterminate="props.indeterminate"
          :disabled="props.disabled"
          :invalid="props.invalid"
        />
        <Field.Label for="notifications">
          Enable notifications
        </Field.Label>
      </Field.Root>

      <Field.Root
        :disabled="props.disabled"
        :invalid="props.invalid || agreementInvalid"
      >
        <Input.Checkbox
          id="agreement"
          v-model="agreementValue"
          name="agreement"
          :indeterminate="props.indeterminate"
          :disabled="props.disabled"
          :invalid="props.invalid || agreementInvalid"
        />
        <Field.Label for="agreement">
          Agree to the terms and conditions
        </Field.Label>

        <Field.Error v-if="agreementInvalid">
          You must accept the terms and conditions.
        </Field.Error>
      </Field.Root>
    </Fieldset.Group>

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
