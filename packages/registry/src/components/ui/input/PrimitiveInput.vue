<script setup lang="ts">
/**
 * PrimitiveInput component
 *
 * The base input component that other input components extend from. It provides
 * common functionality and styling for various types of input fields.
 */

import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type InputType
  = | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

type ReadonlySupportedType = Extract<
  InputType,
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
>

type ReadonlyUnsupportedType = Exclude<InputType, ReadonlySupportedType>

interface CommonProps {
  scope: string
  id?: string | undefined
  name?: string | undefined
  defaultValue?: string | undefined
  modelValue?: string | undefined
  class?: HTMLAttributes['class']
  required?: boolean
  invalid?: boolean
  loading?: boolean
  disabled?: boolean
}

export type Props
  = | (CommonProps & {
    /** Input types that support readonly */
    type: ReadonlySupportedType
    readonly?: boolean
  })
  | (CommonProps & {
    /** Input types that do not support readonly */
    type: ReadonlyUnsupportedType
    readonly?: never
  })

export interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'disabled',
  'invalid',
  'loading',
  'readonly',
  'required',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const required = computed(() => props.required || undefined)
const invalid = computed(() => props.invalid || undefined)
const loading = computed(() => props.loading || undefined)
const readonly = computed(() => props.readonly || undefined)
const disabled = computed(() => props.disabled || props.loading || undefined)
</script>

<template>
  <input
    v-bind="forwardedProps"
    :id="props.id"
    v-model="modelValue"
    :name="props.name"
    :data-scope="props.scope"
    :type="props.type"
    :required="required"
    :readonly="readonly"
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
