<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  defaultValue?: string | undefined
  modelValue?: string | undefined
  class?: HTMLAttributes['class']
  invalid?: boolean
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const invalid = computed(() => props.invalid || undefined)
const disabled = computed(() => props.disabled || undefined)
</script>

<template>
  <textarea
    v-model="modelValue"
    data-scope="textarea-input"
    :disabled="disabled"
    :aria-invalid="invalid"
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
  />
</template>
