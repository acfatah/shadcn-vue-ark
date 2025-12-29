<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  defaultValue?: File[]
  modelValue?: File[]
  multiple?: boolean
  accept?: string
  name?: string
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  class?: HTMLAttributes['class']
}

interface Emits {
  (e: 'update:modelValue', payload: File[]): void
  (e: 'change', payload: File[]): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'defaultValue',
  'disabled',
  'invalid',
  'loading',
  'modelValue',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)

const files = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? [],
})

function onChange(event: Event) {
  const target = event.target as HTMLInputElement | null
  const list = target?.files
  const next = list ? Array.from(list) : []

  files.value = next
  emits('change', next)
}

const ariaInvalid = computed(() => props.invalid || undefined)
const disabled = computed(() => props.disabled || undefined)
const ariaBusy = computed(() => props.loading || undefined)
</script>

<template>
  <input
    v-bind="forwardedProps"
    :disabled="disabled"
    :aria-invalid="ariaInvalid"
    :aria-busy="ariaBusy"
    data-scope="file-input"
    type="file"
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
    @change="onChange"
  >
</template>
