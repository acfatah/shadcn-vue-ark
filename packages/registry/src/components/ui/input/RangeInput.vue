<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  defaultValue?: string | number
  modelValue?: string | number
  hideThumb?: boolean
  class?: InputHTMLAttributes['class']
  invalid?: boolean
  disabled?: boolean
}

interface Emits {
  (event: 'update:modelValue', payload: string | number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const attrs = useAttrs()

function toNumericValue(value: unknown): number | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === 'string') {
    const parsed = Number(value)

    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const sliderValue = computed(() => toNumericValue(modelValue.value) ?? 0)
const sliderMin = computed(() => toNumericValue(attrs.min) ?? 0)
const sliderMax = computed(() => toNumericValue(attrs.max) ?? 100)

const rangePercentage = computed(() => {
  const min = sliderMin.value
  const max = sliderMax.value

  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
    return 0
  }

  const clampedValue = clampNumber(sliderValue.value, min, max)
  const percent = ((clampedValue - min) / (max - min)) * 100

  return Math.min(Math.max(percent, 0), 100)
})

const trackStyle = computed(() => ({
  '--range-track': `linear-gradient(90deg, var(--primary) 0%, var(--primary) ${rangePercentage.value}%, var(--border) ${rangePercentage.value}%, var(--border) 100%)`,
}))

const invalid = computed(() => props.invalid ?? undefined)
const disabled = computed(() => props.disabled ?? undefined)
const hideThumb = computed(() => (props.hideThumb || modelValue.value === undefined) ? 'true' : undefined)
</script>

<template>
  <input
    v-model="modelValue"
    data-scope="range-input"
    type="range"
    :data-hide-thumb="hideThumb"
    :disabled="disabled"
    :aria-invalid="invalid"
    :style="trackStyle"
    :class="cn(
      'h-9 w-full rounded',
      `focus:ring-[3px] focus:ring-ring/50 focus:outline-none`,
      `disabled:pointer-events-none disabled:opacity-50`,
      `
        aria-invalid:border aria-invalid:border-destructive aria-invalid:p-1
        aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
</template>

<style lang="css">
input[data-scope='range-input'] {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border-radius: var(--radius-md);
}

input[data-scope='range-input']::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: var(--radius-md);
  background: var(--range-track, var(--border));
}

input[data-scope='range-input']::-moz-range-track {
  height: 6px;
  border-radius: var(--radius-md);
  background: var(--range-track, var(--border));
}

input[data-scope='range-input']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--primary);
  height: 1rem;
  width: 1rem;
  margin-top: -5px;
  border-radius: 50%;
  transition: transform 0.25s ease-in-out;
}

input[data-scope='range-input']::-moz-range-thumb {
  border: none;
  background-color: var(--primary);
  height: 1rem;
  width: 1rem;
  transition: transform 0.25s ease-in-out;
}

input[data-scope='range-input'][data-hide-thumb='true']::-webkit-slider-thumb {
  height: 0 !important;
  width: 0 !important;
}

input[data-scope='range-input'][data-hide-thumb='true']::-moz-range-thumb {
  height: 0 !important;
  width: 0 !important;
}
</style>
