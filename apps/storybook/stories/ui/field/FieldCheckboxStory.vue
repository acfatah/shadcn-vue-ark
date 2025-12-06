<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { cn } from '@/lib/utils'

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
      <Field.Checkbox id="subscribe">
        <Checkbox.Label for="subscribe">
          Subscribe to newsletter
        </Checkbox.Label>
      </Field.Checkbox>
      <Field.Error v-if="props.invalid">
        Value is required.
      </Field.Error>
    </Field.Root>

    <Field.Root
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
    >
      <Field.Checkbox id="accept-terms">
        <Checkbox.Label>
          Accept terms and conditions<Field.RequiredIndicator />
        </Checkbox.Label>
        <Checkbox.Description>By clicking this checkbox, you agree to the terms and conditions.</Checkbox.Description>
      </Field.Checkbox>
      <Field.Error v-if="props.invalid">
        Value is required.
      </Field.Error>
    </Field.Root>

    <Field.Root
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
    >
      <Field.Checkbox
        id="notification"
        :class="cn(
          `flex items-start gap-3 rounded-lg border p-3`,
          `
            data-invalid:border-destructive/50 data-invalid:bg-destructive/5
            data-[state=checked]:border-primary data-[state=checked]:bg-primary/5
            dark:data-[state=checked]:bg-primary/10
          `,
        )"
      >
        <Checkbox.Label>Enable notifications</Checkbox.Label>
        <Checkbox.Description>You can enable or disable notifications at any time.</Checkbox.Description>
      </Field.Checkbox>
      <Field.Error v-if="props.invalid">
        Value is required.
      </Field.Error>
    </Field.Root>
  </div>
</template>
