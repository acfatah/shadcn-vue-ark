<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

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

const selectedCompute = ref('vm')
const computes = [
  {
    title: 'Kubernetes',
    value: 'k8s',
    description: 'Run GPU workloads on a K8s configured cluster. This is the default.',
  },
  {
    title: 'Virtual Machine',
    value: 'vm',
    description: 'Access a VM configured cluster to run workloads. (Coming soon)',
  },
]
</script>

<template>
  <div class="flex flex-col gap-8">
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
        <RadioGroup.Item v-for="value in spacings" :key="value" :value="value">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{{ value }}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup.Items>
    </RadioGroup.Root>

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

    <RadioGroup.Root
      v-model="selectedCompute"
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
      :orientation="props.orientation"
    >
      <RadioGroup.Label>Choose your plan</RadioGroup.Label>
      <RadioGroup.Description>You can change your plan at any time.</RadioGroup.Description>
      <RadioGroup.Items>
        <RadioGroup.Item
          v-for="compute in computes"
          :key="compute.value"
          :value="compute.value"
          :class="cn(
            `flex items-start justify-between gap-3 rounded-lg border p-3`,
            `
              data-invalid:border-destructive/50 data-invalid:bg-destructive/5
              data-[state=checked]:border-primary data-[state=checked]:bg-primary/5
              data-disabled:data-[state=checked]:border-primary/50
              dark:data-[state=checked]:bg-primary/10
            `,
          )"
        >
          <RadioGroup.ItemContent>
            <RadioGroup.ItemText>{{ compute.title }}</RadioGroup.ItemText>
            <RadioGroup.ItemDescription>{{ compute.description }}</RadioGroup.ItemDescription>
          </RadioGroup.ItemContent>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      </RadioGroup.Items>
    </RadioGroup.Root>
  </div>
</template>
