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
      <Field.Label for="username">
        Username<Field.RequiredIndicator />
      </Field.Label>
      <Field.Input id="username" type="text" placeholder="Max Leiter" />
      <Field.Description>
        Choose a unique username for your account.
      </Field.Description>
      <Field.Error v-if="props.invalid">
        Username is already taken.
      </Field.Error>
    </Field.Root>

    <Field.Root
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
    >
      <Field.Label for="password">
        Password<Field.RequiredIndicator />
      </Field.Label>
      <Field.Description>
        Must be at least 8 characters long.
      </Field.Description>
      <Field.Input id="password" type="password" placeholder="********" />
      <Field.Error v-if="props.invalid">
        Password must be at least 8 characters.
      </Field.Error>
    </Field.Root>
  </div>
</template>
