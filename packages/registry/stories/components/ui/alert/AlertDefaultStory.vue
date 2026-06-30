<script setup lang="ts">
import { CheckCircle2Icon } from 'lucide-vue-next'

import { Alert } from '@/components/ui/alert'
</script>

<template>
  <Alert.Root class="max-w-xl">
    <CheckCircle2Icon />
    <Alert.Title>Heads up!</Alert.Title>
    <Alert.Description>
      You can add components to your app using the CLI.
    </Alert.Description>
  </Alert.Root>
</template>
