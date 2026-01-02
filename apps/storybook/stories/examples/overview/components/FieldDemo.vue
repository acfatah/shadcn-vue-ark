<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { createListCollection, Select } from '@/components/ui/select'

const months = createListCollection<{ label: string, value: string }>({
  items: Array.from({ length: 12 }, (_, i) => ({
    label: String(i + 1).padStart(2, '0'),
    value: String(i + 1).padStart(2, '0'),
  })),
})

const years = createListCollection<{ label: string, value: string }>({
  items: Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() + i

    return {
      label: String(year),
      value: String(year),
    }
  }),
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
  <div class="w-full max-w-md">
    <form ref="formRef" @submit="handleSubmit">
      <Fieldset.Group>
        <Fieldset.Root>
          <Fieldset.Legend>Payment Method</Fieldset.Legend>
          <Fieldset.Description>
            All transactions are secure and encrypted
          </Fieldset.Description>
          <Fieldset.Group>
            <Field.Root>
              <Field.Label for="checkout-7j9-card-name-43j">
                Name on Card
              </Field.Label>
              <Field.Input
                id="checkout-7j9-card-name-43j"
                name="cardName"
                placeholder="Evil Rabbit"
                required
              />
            </Field.Root>
            <Field.Root>
              <Field.Label for="checkout-7j9-card-number-uw1">
                Card Number
              </Field.Label>
              <Field.Input
                id="checkout-7j9-card-number-uw1"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Field.Description>
                Enter your 16-digit card number
              </Field.Description>
            </Field.Root>
            <div class="grid grid-cols-3 gap-4">
              <Field.Root>
                <Field.Label for="checkout-exp-month-ts6">
                  Month
                </Field.Label>
                <Select.Root
                  id="checkout-exp-month-ts6"
                  :collection="months"
                  required
                >
                  <Select.HiddenSelect name="expMonth" />
                  <Select.Trigger>
                    <Select.ValueText placeholder="MM" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item
                      v-for="month in months.items"
                      :key="month.label"
                      :item="month"
                    />
                  </Select.Content>
                </Select.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label for="checkout-7j9-exp-year-f59">
                  Year
                </Field.Label>
                <Select.Root
                  id="checkout-7j9-exp-year-f59"
                  :collection="years"
                  required
                >
                  <Select.HiddenSelect name="expYear" />
                  <Select.Trigger>
                    <Select.ValueText placeholder="YYYY" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item
                      v-for="year in years.items"
                      :key="year.label"
                      :item="year"
                    />
                  </Select.Content>
                </Select.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label for="checkout-7j9-cvv">
                  CVV
                </Field.Label>
                <Field.Input
                  id="checkout-7j9-cvv"
                  name="cvv"
                  placeholder="123"
                  required
                />
              </Field.Root>
            </div>
          </Fieldset.Group>
        </Fieldset.Root>
        <Fieldset.Separator />
        <Fieldset.Root>
          <Fieldset.Legend>Billing Address</Fieldset.Legend>
          <Fieldset.Description>
            The billing address associated with your payment method
          </Fieldset.Description>
          <Fieldset.Group>
            <Field.Root orientation="horizontal">
              <Field.Checkbox
                id="checkout-7j9-same-as-shipping-wgm"
                name="sameAsShipping"
                :default-checked="true"
              >
                <Field.Label
                  for="checkout-7j9-same-as-shipping-wgm"
                  class="font-normal"
                >
                  Same as shipping address
                </Field.Label>
              </Field.Checkbox>
              <!-- Or -->
              <!-- <Input.Checkbox
                id="checkout-7j9-same-as-shipping-wgm"
                name="sameAsShipping"
                :default-checked="true"
              />
              <Field.Label
                for="checkout-7j9-same-as-shipping-wgm"
                class="font-normal"
              >
                Same as shipping address
              </Field.Label> -->
            </Field.Root>
          </Fieldset.Group>
        </Fieldset.Root>
        <Fieldset.Root>
          <Fieldset.Group>
            <Field.Root>
              <Field.Label for="checkout-7j9-optional-comments">
                Comments
              </Field.Label>
              <Field.Textarea
                id="checkout-7j9-optional-comments"
                name="comments"
                placeholder="Add any additional comments"
                class="resize-none"
              />
            </Field.Root>
          </Fieldset.Group>
        </Fieldset.Root>
        <Field.Root orientation="horizontal">
          <Input.Submit>Submit</Input.Submit>
          <Input.Reset>Cancel</Input.Reset>
        </Field.Root>
      </Fieldset.Group>
    </form>

    <template v-if="submittedValues !== null">
      <p class="mt-4 text-sm text-muted-foreground">
        Submitted values:
      </p>

      <pre
        class="
          overflow-x-auto rounded border bg-neutral-100 p-2 text-sm text-foreground
          dark:bg-neutral-900
        "
      ><code>{{ submittedValues ? JSON.stringify(submittedValues, null, 2) : '-' }}</code></pre>
    </template>
  </div>
</template>
