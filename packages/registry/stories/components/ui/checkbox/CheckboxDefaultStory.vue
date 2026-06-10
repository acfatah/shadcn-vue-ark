<script setup lang="ts">
import type { CheckboxVariants } from '@/components/ui/checkbox'

import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps<{
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  variant?: CheckboxVariants['variant']
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

    <Checkbox.Root v-bind="props">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Checkbox.Label>Enable notifications</Checkbox.Label>
        <Checkbox.Description>You can enable or disable notifications at any time.</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  </div>
</template>
