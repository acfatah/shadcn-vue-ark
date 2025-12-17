<script setup lang="ts">
/**
 * PrimitiveInput component
 *
 * The base input component that other input components extend from. It provides
 * common functionality and styling for various types of input fields.
 */

import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface Props {
  scope: string

  /** Common input types */
  type:
    | 'button'
    // | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    // | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  id?: string | undefined
  name?: string | undefined
  defaultValue?: string | undefined
  modelValue?: string | undefined
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  disabled?: boolean
}

export interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const invalid = computed(() => props.invalid ?? undefined)
const loading = computed(() => props.loading ?? undefined)
const disabled = computed(() => (props.disabled || props.loading) ?? undefined)
</script>

<template>
  <input
    v-model="modelValue"
    :data-scope="props.scope"
    :type="props.type"
    :disabled="disabled"
    :aria-invalid="invalid"
    :aria-busy="loading"
    :class="cn(
      `
        h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base
        shadow-xs transition-[color,box-shadow] outline-none
        selection:bg-primary selection:text-primary-foreground
        file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
        file:text-foreground
        placeholder:text-muted-foreground
        disabled:pointer-events-none disabled:opacity-50
        md:text-sm
        dark:bg-input/30
      `,
      `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
</template>
