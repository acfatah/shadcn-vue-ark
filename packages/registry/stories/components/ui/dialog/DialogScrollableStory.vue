<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger as-child>
      <Button variant="outline">
        Open terms
      </Button>
    </Dialog.Trigger>

    <Dialog.ScrollContent class="sm:max-w-lg">
      <Dialog.Header>
        <Dialog.Title>Terms of Service</Dialog.Title>
        <Dialog.Description>
          Please read these terms carefully before continuing.
        </Dialog.Description>
      </Dialog.Header>

      <div class="space-y-4 text-sm">
        <p v-for="n in 12" :key="n">
          {{ n }}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>

      <Dialog.Footer>
        <Dialog.Close as-child>
          <Button>Accept</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.ScrollContent>
  </Dialog.Root>
</template>
