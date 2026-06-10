<script setup lang="ts">
import { computed, ref } from 'vue'

import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  inline?: boolean
}>()

const inputProps = computed(() => ({
  disabled: props.disabled,
  invalid: props.invalid,
}))

const orientation = computed(() => (props.inline ? 'responsive' : 'vertical'))

const selectValue = ref('')
const rangeValue = ref(32)
const checkboxValue = ref(false)
const radioValue = ref('personal')

const selectOptions = [
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'archived', label: 'Archived' },
]

const radioOptions = [
  { value: 'personal', label: 'Personal' },
  { value: 'team', label: 'Team', description: 'Free for open source' },
  { value: 'enterprise', label: 'Enterprise', description: 'Free for open source' },
]
</script>

<template>
  <!--
    See Field and Fieldset components for granular form field grouping and accessibility
  -->
  <Fieldset.Group class="gap-6">
    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="email">
        Email<Field.RequiredIndicator />
      </Field.Label>
      <Input.Email id="email" placeholder="Email" v-bind="inputProps" />
      <Field.Description>Your email will not be shared.</Field.Description>
      <Field.Error v-if="props.invalid">
        Email is invalid.
      </Field.Error>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="full-name">
        Full name
      </Field.Label>
      <Field.Input id="full-name" placeholder="Jane Doe" />
      <Field.Description>Use your legal name.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="message">
        Message
      </Field.Label>
      <Field.Textarea id="message" placeholder="Type your message here." />
      <Field.Description>Your message will be copied to the support team.</Field.Description>
      <Field.Error v-if="props.invalid">
        Message is required.
      </Field.Error>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="password">
        Password
      </Field.Label>
      <Input.Password id="password" placeholder="Enter a password" v-bind="inputProps" />
      <Field.Description>Use at least 8 characters.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="search">
        Search
      </Field.Label>
      <Input.Search id="search" placeholder="Search messages" v-bind="inputProps" />
      <Field.Description>Try searching for "invoice".</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="number">
        Seats
      </Field.Label>
      <Input.Number id="number" placeholder="0" min="1" max="50" v-bind="inputProps" />
      <Field.Description>Max 50 seats per team.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="tel">
        Phone
      </Field.Label>
      <Input.Tel id="tel" placeholder="+1 (555) 000-0000" v-bind="inputProps" />
      <Field.Description>Include your country code.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="url">
        Website
      </Field.Label>
      <Input.Url id="url" placeholder="https://example.com" v-bind="inputProps" />
      <Field.Description>Include the full URL.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="date">
        Start date
      </Field.Label>
      <Input.Date id="date" v-bind="inputProps" />
      <Field.Description>We will use your local timezone.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="time">
        Start time
      </Field.Label>
      <Input.Time id="time" v-bind="inputProps" />
      <Field.Description>Choose a convenient time.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="datetime">
        Schedule
      </Field.Label>
      <Input.DatetimeLocal id="datetime" v-bind="inputProps" />
      <Field.Description>Use local date and time.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="month">
        Billing month
      </Field.Label>
      <Input.Month id="month" v-bind="inputProps" />
      <Field.Description>Pick a billing month.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="week">
        Sprint week
      </Field.Label>
      <Input.Week id="week" v-bind="inputProps" />
      <Field.Description>Select the sprint week.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="color">
        Theme color
      </Field.Label>
      <Input.Color id="color" v-bind="inputProps" />
      <Field.Description>Pick a brand color.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="file">
        Upload file
      </Field.Label>
      <Input.File id="file" v-bind="inputProps" />
      <Field.Description>PDF or DOCX up to 10MB.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="range">
        Progress
      </Field.Label>
      <Input.Range
        id="range"
        v-model="rangeValue"
        min="0"
        max="100"
        step="1"
        v-bind="inputProps"
      />
      <Field.Description>Current value: {{ rangeValue }}%</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label for="status">
        Status
      </Field.Label>
      <Input.Select id="status" v-model="selectValue" v-bind="inputProps">
        <option data-part="placeholder" value="" disabled>
          Select status
        </option>
        <option v-for="option in selectOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </Input.Select>
      <Field.Description>Pick the current status.</Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Input.Checkbox
        id="marketing"
        v-model="checkboxValue"
        v-bind="inputProps"
      />
      <Field.Label for="marketing">
        Marketing emails
      </Field.Label>
      <Field.Description>Get product updates.</Field.Description>
    </Field.Root>

    <Field.Root
      v-for="(option, index) in radioOptions"
      :key="option.value"
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
      :class="index < radioOptions.length - 1 && '-mb-4'"
    >
      <Input.Radio
        :id="`account-${option.value}`"
        v-model="radioValue"
        name="account-type"
        :value="option.value"
        :disabled="props.disabled"
        :invalid="props.invalid"
      />
      <Field.Label :for="`account-${option.value}`">
        {{ option.label }}
      </Field.Label>
      <Field.Description v-if="option.description">
        {{ option.description }}
      </Field.Description>
    </Field.Root>

    <Field.Root
      :orientation="orientation"
      :disabled="props.disabled"
      :invalid="props.invalid"
    >
      <Field.Label>
        Actions
      </Field.Label>
      <div class="flex flex-wrap gap-2">
        <Input.Submit :disabled="props.disabled">
          Submit
        </Input.Submit>
        <Input.Reset :disabled="props.disabled">
          Reset
        </Input.Reset>
      </div>
      <Field.Description>Submit or clear the form.</Field.Description>
    </Field.Root>
  </Fieldset.Group>
</template>
