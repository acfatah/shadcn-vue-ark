<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: File[]
  modelValue?: File[]
  multiple?: boolean
  accept?: string
  name?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: File[]): void
  (e: 'change', payload: File[]): void
}>()

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
</script>

<template>
  <input
    :multiple="multiple"
    :accept="accept"
    :name="name"
    :disabled="disabled"
    data-scope="input"
    data-part="file"
    type="file"
    :class="cn(
      `
        h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base
        shadow-xs transition-[color,box-shadow] outline-none
        selection:bg-primary selection:text-primary-foreground
        file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
        file:text-foreground
        placeholder:text-muted-foreground
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
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
