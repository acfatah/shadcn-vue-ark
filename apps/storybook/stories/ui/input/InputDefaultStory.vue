<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

const disabled = computed(() => {
  const attrs = useAttrs()

  return attrs.disabled as boolean | undefined
})

const invalid = computed(() => {
  const attrs = useAttrs()

  return attrs.invalid as boolean | undefined
})
</script>

<template>
  <Fieldset.Group>
    <Fieldset.Description>
      This story showcases all the different input types available in the Input component including Field components.
    </Fieldset.Description>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="text">
        Text
      </Field.Label>
      <Input.Text id="text" placeholder="Your name" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Basic text input.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="email">
        Email
      </Field.Label>
      <Input.Email id="email" placeholder="Email" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Your email will not be shared.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="password">
        Password
      </Field.Label>
      <Input.Password id="password" placeholder="Password" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Use at least 8 characters.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="url">
        Website
      </Field.Label>
      <Input.Url id="url" placeholder="https://example.com" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Add your personal site.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="tel">
        Phone
      </Field.Label>
      <Input.Tel id="tel" placeholder="+1 555 123 4567" :disabled="disabled" :invalid="invalid" />
      <Field.Description>We will only use it for support.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="search">
        Search
      </Field.Label>
      <Input.Search id="search" placeholder="Search docs" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Try searching for "Input".</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="message">
        Message
      </Field.Label>
      <Input.Textarea id="message" placeholder="Type your message here." />
      <Field.Description>Your message will be copied to the support team.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="number">
        Number
      </Field.Label>
      <Input.Number id="number" placeholder="0" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Pick a number between 1 and 10.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="range">
        Range
      </Field.Label>
      <Input.Range id="range" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Adjust the range slider.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="date">
        Date
      </Field.Label>
      <Input.Date id="date" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Select a date.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="datetime">
        Datetime
      </Field.Label>
      <Input.DatetimeLocal id="datetime" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Pick date and time.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="time">
        Time
      </Field.Label>
      <Input.Time id="time" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Select a time.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="month">
        Month
      </Field.Label>
      <Input.Month id="month" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Select a month.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="week">
        Week
      </Field.Label>
      <Input.Week id="week" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Select a week.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="color">
        Color
      </Field.Label>
      <Input.Color id="color" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Pick a color.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="file">
        File
      </Field.Label>
      <Input.File id="file" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Upload a file.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label>
        Checkbox
      </Field.Label>
      <Input.Checkbox name="terms" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Accept terms and conditions.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label>
        Radio
      </Field.Label>
      <Input.Radio name="plan" :disabled="disabled" :invalid="invalid" />
      <Field.Description>Choose the standard plan.</Field.Description>
    </Field.Root>

    <Field.Root :disabled="disabled" :invalid="invalid">
      <Field.Label for="select">
        Select
      </Field.Label>
      <Input.Select id="select" :disabled="disabled" :invalid="invalid">
        <option value="" disabled>
          Select a timezone
        </option>
        <option value="utc">
          UTC
        </option>
        <option value="pst">
          PST
        </option>
        <option value="est">
          EST
        </option>
      </Input.Select>
      <Field.Description>Pick your timezone.</Field.Description>
    </Field.Root>
  </Fieldset.Group>

  <Fieldset.Group class="mt-6">
    <Fieldset.Legend>
      Actions
    </Fieldset.Legend>

    <div class="flex flex-wrap gap-2">
      <Input.Reset>Reset</Input.Reset>
      <Input.Submit>Submit</Input.Submit>
    </div>
    <Fieldset.Description>Use button-style inputs for actions.</Fieldset.Description>
  </Fieldset.Group>
</template>
