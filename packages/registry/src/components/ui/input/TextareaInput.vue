<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  id?: string
  name?: string
  defaultValue?: string | undefined
  modelValue?: string | undefined
  class?: HTMLAttributes['class']
  required?: boolean
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
}

interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'defaultValue',
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
const disabled = computed(() => props.disabled || undefined)
const readonly = computed(() => props.readonly || undefined)
const nativeInvalid = ref(false)
const ariaInvalid = computed(() => (props.invalid || nativeInvalid.value) ? 'true' : undefined)
const ariaBusy = computed(() => props.loading || undefined)

function handleInvalid(_event: Event) {
  nativeInvalid.value = true
}
</script>

<template>
  <textarea
    v-model="modelValue"
    v-bind="forwardedProps"
    data-scope="textarea-input"
    :disabled="disabled"
    :aria-invalid="ariaInvalid"
    :aria-busy="ariaBusy"
    :required="required"
    :readonly="readonly"
    :class="cn(
      `
        flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3
        py-2 text-base shadow-xs transition-[color,box-shadow] outline-none
        placeholder:text-muted-foreground
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        disabled:opacity-50
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        md:text-sm
        dark:bg-input/30 dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
    @invalid="handleInvalid"
    @input="nativeInvalid = false"
  />
</template>
