<script setup lang="ts">
import { ref } from 'vue'

import { RadioGroup } from '@/components/ui/radio-group'

const props = withDefaults(defineProps<{
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
}>(), {
  disabled: false,
  invalid: false,
  required: true,
  orientation: 'vertical',
})

const selectedSpacing = ref('comfortable')
const spacings = ['default', 'comfortable', 'compact']
</script>

<template>
  <RadioGroup.Root
    v-model="selectedSpacing"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :required="props.required"
    :orientation="props.orientation"
  >
    <RadioGroup.Label>Spacing</RadioGroup.Label>
    <RadioGroup.Description>Select the spacing between items.</RadioGroup.Description>
    <RadioGroup.Items>
      <RadioGroup.Item
        v-for="value in spacings"
        :key="value"
        :value="value"
      >
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>{{ value }}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Items>
  </RadioGroup.Root>
</template>
