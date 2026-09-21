<script setup lang="ts">
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-vue-next'

import { Alert } from '@/components/ui/alert'
</script>

<template>
  <div class="grid w-full max-w-xl items-start gap-4">
    <Alert.Root variant="success">
      <CircleCheckIcon />
      <Alert.Title>Payment received</Alert.Title>
      <Alert.Description>
        Your invoice has been paid and a receipt was sent to your email.
      </Alert.Description>
    </Alert.Root>

    <Alert.Root variant="info">
      <InfoIcon />
      <Alert.Title>Scheduled maintenance</Alert.Title>
      <Alert.Description>
        The dashboard will be read-only on Sunday from 02:00 to 04:00 UTC.
      </Alert.Description>
    </Alert.Root>

    <Alert.Root variant="warning">
      <TriangleAlertIcon />
      <Alert.Title>Storage almost full</Alert.Title>
      <Alert.Description>
        You have used 92% of your quota. Remove old files or upgrade your plan.
      </Alert.Description>
    </Alert.Root>
  </div>
</template>
