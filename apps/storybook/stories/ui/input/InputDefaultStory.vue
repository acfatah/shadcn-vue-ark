<script setup lang="ts">
import { computed, useAttrs } from 'vue'
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
  <!--
    See Field and Fieldset components for better form field grouping and accessibility
  -->
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <Input.Label for="email">
        Email
      </Input.Label>
      <Input.Text id="email" type="email" placeholder="Email" :disabled="disabled" :invalid="invalid" />
      <Input.Description>Your email will not be shared.</Input.Description>
    </div>

    <div class="flex flex-col gap-3">
      <Input.Label for="message">
        Message
      </Input.Label>
      <Input.Textarea id="message" placeholder="Type your message here." :disabled="disabled" :invalid="invalid" />
      <Input.Description>Your message will be copied to the support team.</Input.Description>
    </div>
  </div>
</template>
