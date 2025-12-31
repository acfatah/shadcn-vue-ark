<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  name?: string
  defaultValue?: string | number | null
  modelValue?: string | number | null
  value: string | number
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  class?: HTMLAttributes['class']
}

interface Emits {
  (event: 'update:modelValue', payload: string | number): void
  (e: 'change', payload: string | number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'disabled',
  'invalid',
  'loading',
  'modelValue',
  'required',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)

const selectedValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isChecked = computed(() => selectedValue.value === props.value)
const state = computed(() => (isChecked.value ? 'checked' : 'unchecked'))
const ariaInvalid = computed(() => props.invalid || undefined)
const dataInvalid = computed(() => (props.invalid ? '' : undefined))
const disabled = computed(() => props.disabled || props.loading || undefined)
const dataDisabled = computed(() => (disabled.value ? '' : undefined))
const ariaBusy = computed(() => props.loading || undefined)
const dataLoading = computed(() => (props.loading ? '' : undefined))

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
    :data-state="state"
    :data-disabled="dataDisabled"
    :data-invalid="dataInvalid"
    :data-loading="dataLoading"
    :class="cn(
      `
        peer inline-flex aspect-square size-4 shrink-0 rounded-full border border-input text-primary
        shadow-xs transition-[color,box-shadow] outline-none
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50
        data-invalid:border-destructive data-invalid:ring-destructive/20
        dark:bg-input/30 dark:data-invalid:ring-destructive/40
      `,
      props.class,
    )"
    @click="onClick"
  >
    <input
      v-bind="forwardedProps"
      data-scope="radio-input"
      data-part="input"
      :checked="isChecked"
      :value="props.value"
      :name="name"
      :disabled="disabled"
      :required="required"
      :aria-invalid="ariaInvalid"
      :aria-busy="ariaBusy"
      type="radio"
      class="peer sr-only"
      @change="onChange"
    >
    <div
      data-scope="radio-input"
      data-part="control"
      :data-state="state"
      :data-disabled="dataDisabled"
      :data-invalid="dataInvalid"
      :data-loading="dataLoading"
      :class="cn(
        `relative flex w-full items-center justify-center rounded-full`,
        `
          peer-focus-visible:border-ring peer-focus-visible:ring-[3px]
          peer-focus-visible:ring-ring/50
          peer-disabled:opacity-50
        `,
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
