<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <!--
    See Field and Fieldset components for better form field grouping and accessibility
  -->
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <Input.Label for="email">
        Email
      </Input.Label>
      <Input.Text id="email" type="email" placeholder="Email" />
      <Input.Description>Your email will not be shared.</Input.Description>
    </div>

    <div class="flex flex-col gap-3">
      <Input.Label for="message">
        Message
      </Input.Label>
      <Input.Textarea id="message" placeholder="Type your message here." />
      <Input.Description>Your message will be copied to the support team.</Input.Description>
    </div>
  </div>
</template>
