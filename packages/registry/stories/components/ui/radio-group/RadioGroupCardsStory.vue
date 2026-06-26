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
  <RadioGroup.Root
    v-model="selectedCompute"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :required="props.required"
    :orientation="props.orientation"
  >
    <RadioGroup.Label>Compute</RadioGroup.Label>
    <RadioGroup.Description>Select where to run your workloads.</RadioGroup.Description>
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
</template>
