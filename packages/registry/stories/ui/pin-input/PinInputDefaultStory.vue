<script setup lang="ts">
import { PinInput } from '@/components/ui/pin-input'
</script>

<template>
  <PinInput.Root :maxlength="6" placeholder="">
    <PinInput.Group>
      <PinInput.Slot :index="0" />
      <PinInput.Slot :index="1" />
      <PinInput.Slot :index="2" />
    </PinInput.Group>
    <PinInput.Separator />
    <PinInput.Group>
      <PinInput.Slot :index="3" />
      <PinInput.Slot :index="4" />
      <PinInput.Slot :index="5" />
    </PinInput.Group>
  </PinInput.Root>
</template>
