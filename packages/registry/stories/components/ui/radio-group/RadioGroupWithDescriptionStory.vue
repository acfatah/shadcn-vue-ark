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

const selectedPlan = ref('pro')
const plans = [
  {
    title: 'Basic Plan',
    value: 'basic',
    description: 'Perfect for individuals just getting started',
  },
  {
    title: 'Pro',
    value: 'pro',
    description: 'Advanced features for power users and small teams',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
    description: 'Custom solutions for large organizations',
  },
]
</script>

<template>
  <RadioGroup.Root
    v-model="selectedPlan"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :required="props.required"
    :orientation="props.orientation"
  >
    <RadioGroup.Label>Choose your plan</RadioGroup.Label>
    <RadioGroup.Description>You can change your plan at any time.</RadioGroup.Description>
    <RadioGroup.Items>
      <RadioGroup.Item v-for="plan in plans" :key="plan.value" :value="plan.value">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemContent>
          <RadioGroup.ItemText>{{ plan.title }}</RadioGroup.ItemText>
          <RadioGroup.ItemDescription>{{ plan.description }}</RadioGroup.ItemDescription>
        </RadioGroup.ItemContent>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Items>
  </RadioGroup.Root>
</template>
