<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <div class="flex flex-col gap-6">
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>

    <Checkbox.Root default-checked>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Checkbox.Label>Enable notifications</Checkbox.Label>
        <Checkbox.Description>
          You can enable or disable notifications at any time.
        </Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  </div>
</template>
