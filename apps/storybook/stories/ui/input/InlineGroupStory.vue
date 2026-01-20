<script setup lang="ts">
import { computed, ref } from 'vue'

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
  <div class="flex flex-col gap-6">
    <Input.Group :inline="props.inline">
      <Input.Label for="email">
        Email<Input.RequiredIndicator />
      </Input.Label>
      <Input.Email id="email" placeholder="Email" v-bind="inputProps" />
      <Input.Description>Your email will not be shared.</Input.Description>
      <Input.Error v-if="props.invalid">
        Email is invalid.
      </Input.Error>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="full-name">
        Full name
      </Input.Label>
      <Input.Text id="full-name" placeholder="Jane Doe" v-bind="inputProps" />
      <Input.Description>Use your legal name.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="message">
        Message
      </Input.Label>
      <Input.Textarea id="message" placeholder="Type your message here." v-bind="inputProps" />
      <Input.Description>Your message will be copied to the support team.</Input.Description>
      <Input.Error v-if="props.invalid">
        Message is required.
      </Input.Error>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="password">
        Password
      </Input.Label>
      <Input.Password id="password" placeholder="Enter a password" v-bind="inputProps" />
      <Input.Description>Use at least 8 characters.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="search">
        Search
      </Input.Label>
      <Input.Search id="search" placeholder="Search messages" v-bind="inputProps" />
      <Input.Description>Try searching for "invoice".</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="number">
        Seats
      </Input.Label>
      <Input.Number id="number" placeholder="0" min="1" max="50" v-bind="inputProps" />
      <Input.Description>Max 50 seats per team.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="tel">
        Phone
      </Input.Label>
      <Input.Tel id="tel" placeholder="+1 (555) 000-0000" v-bind="inputProps" />
      <Input.Description>Include your country code.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="url">
        Website
      </Input.Label>
      <Input.Url id="url" placeholder="https://example.com" v-bind="inputProps" />
      <Input.Description>Include the full URL.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="date">
        Start date
      </Input.Label>
      <Input.Date id="date" v-bind="inputProps" />
      <Input.Description>We will use your local timezone.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="time">
        Start time
      </Input.Label>
      <Input.Time id="time" v-bind="inputProps" />
      <Input.Description>Choose a convenient time.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="datetime">
        Schedule
      </Input.Label>
      <Input.DatetimeLocal id="datetime" v-bind="inputProps" />
      <Input.Description>Use local date and time.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="month">
        Billing month
      </Input.Label>
      <Input.Month id="month" v-bind="inputProps" />
      <Input.Description>Pick a billing month.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="week">
        Sprint week
      </Input.Label>
      <Input.Week id="week" v-bind="inputProps" />
      <Input.Description>Select the sprint week.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="color">
        Theme color
      </Input.Label>
      <Input.Color id="color" v-bind="inputProps" />
      <Input.Description>Pick a brand color.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="file">
        Upload file
      </Input.Label>
      <Input.File id="file" v-bind="inputProps" />
      <Input.Description>PDF or DOCX up to 10MB.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="range">
        Progress
      </Input.Label>
      <Input.Range
        id="range"
        v-model="rangeValue"
        min="0"
        max="100"
        step="1"
        v-bind="inputProps"
      />
      <Input.Description>Current value: {{ rangeValue }}%</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label for="status">
        Status
      </Input.Label>
      <Input.Select id="status" v-model="selectValue" v-bind="inputProps">
        <option data-part="placeholder" value="" disabled>
          Select status
        </option>
        <option v-for="option in selectOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </Input.Select>
      <Input.Description>Pick the current status.</Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Checkbox
        id="marketing"
        v-model="checkboxValue"
        v-bind="inputProps"
      />
      <Input.Label for="marketing">
        Marketing emails
      </Input.Label>
      <Input.Description>Get product updates.</Input.Description>
    </Input.Group>

    <Input.Group
      v-for="(option, index) in radioOptions"
      :key="option.value"
      :inline="props.inline"
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
      <Input.Label :for="`account-${option.value}`">
        {{ option.label }}
      </Input.Label>
      <Input.Description v-if="option.description">
        {{ option.description }}
      </Input.Description>
    </Input.Group>

    <Input.Group :inline="props.inline">
      <Input.Label>
        Actions
      </Input.Label>
      <div class="flex flex-wrap gap-2">
        <Input.Submit :disabled="props.disabled">
          Submit
        </Input.Submit>
        <Input.Reset :disabled="props.disabled">
          Reset
        </Input.Reset>
      </div>
      <Input.Description>Submit or clear the form.</Input.Description>
    </Input.Group>
  </div>
</template>
