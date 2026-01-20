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
  <div class="flex flex-col gap-8">
    <RadioGroup.Root
      v-model="selectedSpacing"
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
      :orientation="props.orientation"
    >
      <RadioGroup.Item v-for="value in spacings" :key="value" :value="value">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>{{ value }}</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>

    <!--
      Reversed order of ItemText and ItemControl example
    -->
    <RadioGroup.Root
      v-model="selectedSpacing"
      :disabled="props.disabled"
      :invalid="props.invalid"
      :required="props.required"
      :orientation="props.orientation"
    >
      <RadioGroup.Item v-for="value in spacings" :key="value" :value="value">
        <RadioGroup.ItemText>{{ value }}</RadioGroup.ItemText>
        <RadioGroup.ItemControl />
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>

    <p v-if="props.orientation === 'horizontal'">
      Wrap <code>RadioGroup.Item</code> with <code>RadioGroup.Items</code> component to apply horizontal layout.
    </p>
  </div>
</template>
