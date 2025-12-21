<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps<{
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <Checkbox.Root v-bind="props">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>

    <Checkbox.Root v-bind="props">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
        <Checkbox.Description>By clicking this checkbox, you agree to the terms and conditions.</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>

    <Checkbox.Root
      v-bind="props"
      class="
        flex items-start gap-3 rounded-lg border p-3
        hover:bg-accent/50
        data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50
        data-[state=unchecked]:data-invalid:border-destructive/50
        dark:data-[state=checked]:border-blue-900 dark:data-[state=checked]:bg-blue-950
      "
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control
        class="
          data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600
          data-[state=checked]:text-white
          dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700
        "
      >
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Checkbox.Label>Enable notifications</Checkbox.Label>
        <Checkbox.Description>You can enable or disable notifications at any time.</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  </div>
</template>
