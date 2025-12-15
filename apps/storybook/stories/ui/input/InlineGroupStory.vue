<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = defineProps<{
  disabled?: boolean
  invalid?: boolean
  inline?: boolean
}>()
</script>

<template>
  <!--
    See Field and Fieldset components for granular form field grouping and accessibility
  -->
  <div class="flex flex-col gap-6">
    <Input.Group :inline="inline">
      <Input.Label for="email">
        Email<Input.RequiredIndicator />
      </Input.Label>
      <Input.Text id="email" type="email" placeholder="Email" v-bind="props" />
      <Input.Description>Your email will not be shared.</Input.Description>
      <Input.Error v-if="invalid">
        Email is invalid.
      </Input.Error>
    </Input.Group>

    <Input.Group :inline="inline">
      <Input.Label for="message">
        Message
      </Input.Label>
      <Input.Textarea id="message" placeholder="Type your message here." v-bind="props" />
      <Input.Description>Your message will be copied to the support team.</Input.Description>
      <Input.Error v-if="invalid">
        Message is required.
      </Input.Error>
    </Input.Group>
  </div>
</template>
