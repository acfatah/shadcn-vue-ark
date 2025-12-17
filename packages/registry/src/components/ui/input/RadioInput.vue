<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  defaultValue?: string | number | null
  modelValue?: string | number | null
  value: string | number
  name?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  class?: HTMLAttributes['class']
}

interface Emits {
  (event: 'update:modelValue', payload: string | boolean | number): void
  (e: 'change', payload: string | number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const selectedValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isChecked = computed(() => selectedValue.value === props.value)
const state = computed(() => (isChecked.value ? 'checked' : 'unchecked'))
const invalid = computed(() => props.invalid ?? undefined)
const disabled = computed(() => props.disabled ?? undefined)

function updateSelection(newValue: string | number) {
  if (props.disabled)
    return

  if (selectedValue.value === newValue)
    return

  selectedValue.value = newValue
  emits('change', newValue)
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (!target.checked)
    return

  updateSelection(props.value)
}

function onClick(_event: Event) {
  updateSelection(props.value)
}
</script>

<template>
  <div
    data-scope="radio-input"
    data-part="root"
    :aria-disabled="disabled"
    :aria-invalid="invalid "
    :class="cn(
      `
        inline-flex aspect-square size-4 shrink-0 rounded-full border border-input text-primary
        shadow-xs transition-[color,box-shadow] outline-none
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:bg-input/30 dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
    @click="onClick"
  >
    <input
      data-scope="radio-input"
      data-part="input"
      :checked="isChecked"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid"
      type="radio"
      class="sr-only"
      @change="onChange"
    >
    <div
      data-scope="radio-input"
      data-part="control"
      :disabled="disabled ? '' : undefined"
      :data-state="state"
      :data-invalid="invalid ? 'true' : undefined"
      :class="cn(
        `relative flex w-full items-center justify-center`,
      )"
    >
      <Icon
        v-show="state === 'checked'"
        data-scope="radio-input"
        data-part="icon"
        icon="lucide:circle"
        class="
          size-2
          [&>circle]:fill-current
        "
      />
    </div>
  </div>
</template>
