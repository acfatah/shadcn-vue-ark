<script setup lang="ts">
import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'

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
  <div class="w-full max-w-md space-y-6">
    <Fieldset.Root
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
    >
      <Fieldset.Legend>
        Address Information
      </Fieldset.Legend>

      <Fieldset.Description>
        We need your address to deliver your order.
      </Fieldset.Description>

      <Fieldset.Group>
        <Field.Root :required="props.required">
          <Field.Label for="street">
            Street Address<Field.RequiredIndicator />
          </Field.Label>
          <Field.Input
            id="street"
            type="text"
            placeholder="123 Main St"
          />
        </Field.Root>

        <div class="grid grid-cols-2 gap-4">
          <Field.Root>
            <Field.Label for="city">
              City<Field.RequiredIndicator />
            </Field.Label>
            <Field.Input id="city" type="text" placeholder="New York" />
          </Field.Root>

          <Field.Root>
            <Field.Label for="zip">
              Postal Code<Field.RequiredIndicator />
            </Field.Label>
            <Field.Input id="zip" type="text" placeholder="90502" />
          </Field.Root>
        </div>
      </Fieldset.Group>

      <Fieldset.Error v-if="props.invalid">
        Some of these details still need your attention.
      </Fieldset.Error>
    </Fieldset.Root>
  </div>
</template>
