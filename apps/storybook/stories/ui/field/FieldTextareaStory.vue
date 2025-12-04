<script setup lang="ts">
import { Field } from '@/components/ui/field'

const props = withDefaults(defineProps<{
  disabled?: boolean
  invalid?: boolean
  required?: boolean
}>(), {
  disabled: false,
  invalid: false,
  required: true,
})
</script>

<template>
  <!-- Can be grouped using Fieldset.Group -->
  <div data-part="group" class="flex flex-col gap-6">
    <Field.Root
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
    >
      <Field.Label for="message">
        Your Message<Field.RequiredIndicator />
      </Field.Label>
      <Field.Textarea id="message" type="text" placeholder="Type your message here." />
      <Field.Description>
        Your message will be copied to the support team.
      </Field.Description>
      <Field.Error v-if="props.invalid">
        Message is required.
      </Field.Error>
    </Field.Root>
  </div>
</template>
